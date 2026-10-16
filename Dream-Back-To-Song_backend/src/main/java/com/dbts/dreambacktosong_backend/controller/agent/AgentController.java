package com.dbts.dreambacktosong_backend.controller.agent;

import com.dbts.dreambacktosong_backend.common.ApiResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@RestController
@Profile("agent-local")
@RequestMapping("/agent")
public class AgentController {
    private final URI gateway;
    private final HttpClient client = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(3)).build();
    private final ObjectMapper mapper = new ObjectMapper();

    public AgentController(@Value("${agent.gateway-url:http://127.0.0.1:8091}") String gatewayUrl) {
        gateway = URI.create(gatewayUrl);
        if (!"http".equals(gateway.getScheme()) || !"127.0.0.1".equals(gateway.getHost())) {
            throw new IllegalArgumentException("Agent gateway must use loopback HTTP");
        }
    }

    @PostMapping("/sessions")
    public ApiResponse<Object> createSession() {
        return forward("POST", "/sessions", Map.of());
    }

    @GetMapping("/sessions/{sessionId:[a-f0-9]{32}}")
    public ApiResponse<Object> session(@PathVariable String sessionId) {
        return forward("GET", "/sessions/" + sessionId, null);
    }

    @PostMapping("/sessions/{sessionId:[a-f0-9]{32}}/turns")
    public ApiResponse<Object> submit(@PathVariable String sessionId, @RequestBody Map<String, Object> body) {
        return forward("POST", "/sessions/" + sessionId + "/turns", body);
    }

    @GetMapping("/sessions/{sessionId:[a-f0-9]{32}}/turns/{turnId:[a-f0-9]{32}}")
    public ApiResponse<Object> turn(@PathVariable String sessionId, @PathVariable String turnId) {
        return forward("GET", "/sessions/" + sessionId + "/turns/" + turnId, null);
    }

    @GetMapping(value = "/sessions/{sessionId:[a-f0-9]{32}}/turns/{turnId:[a-f0-9]{32}}/events",
            produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public ResponseEntity<StreamingResponseBody> events(@PathVariable String sessionId,
                                                         @PathVariable String turnId,
                                                         @RequestParam(defaultValue = "0") long after) {
        var headers = new HttpHeaders();
        headers.setContentType(MediaType.TEXT_EVENT_STREAM);
        headers.set("Cache-Control", "no-cache, no-transform");
        headers.set("Connection", "keep-alive");
        headers.set("X-Accel-Buffering", "no");
        StreamingResponseBody body = output -> {
            try {
                URI uri = gateway.resolve("/sessions/" + sessionId + "/turns/" + turnId + "/events?after=" + Math.max(0, after));
                HttpRequest request = HttpRequest.newBuilder(uri).timeout(Duration.ofMinutes(10))
                        .header("Accept", MediaType.TEXT_EVENT_STREAM_VALUE).GET().build();
                HttpResponse<java.io.InputStream> response = client.send(request, HttpResponse.BodyHandlers.ofInputStream());
                if (response.statusCode() != 200) {
                    output.write(("event: error\ndata: {\"message\":\"助手流式服务暂不可用\"}\n\n").getBytes(java.nio.charset.StandardCharsets.UTF_8));
                    output.flush();
                    return;
                }
                try (var input = response.body()) {
                    byte[] buffer = new byte[8192];
                    int length;
                    while ((length = input.read(buffer)) != -1) {
                        output.write(buffer, 0, length);
                        output.flush();
                    }
                }
            } catch (InterruptedException error) {
                Thread.currentThread().interrupt();
            } catch (IOException error) {
                // The browser may close the stream during navigation or reconnect.
            }
        };
        return ResponseEntity.ok().headers(headers).body(body);
    }

    @PostMapping("/sessions/{sessionId:[a-f0-9]{32}}/actions/{actionId:[a-f0-9]{32}}/receipt")
    public ApiResponse<Object> receipt(@PathVariable String sessionId, @PathVariable String actionId,
                                       @RequestBody Map<String, Object> body) {
        return forward("POST", "/sessions/" + sessionId + "/actions/" + actionId + "/receipt", body);
    }

    @PostMapping("/sessions/{sessionId:[a-f0-9]{32}}/turns/{turnId:[a-f0-9]{32}}/cancel")
    public ApiResponse<Object> cancel(@PathVariable String sessionId, @PathVariable String turnId) {
        return forward("POST", "/sessions/" + sessionId + "/turns/" + turnId + "/cancel", Map.of());
    }

    private ApiResponse<Object> forward(String method, String path, Map<String, Object> body) {
        try {
            HttpRequest request = HttpRequest.newBuilder(gateway.resolve(path)).timeout(Duration.ofSeconds(10))
                    .header("Content-Type", "application/json")
                    .method(method, body == null ? HttpRequest.BodyPublishers.noBody()
                            : HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body))).build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            Map<String, Object> data = mapper.readValue(response.body(), new TypeReference<>() {});
            if (response.statusCode() != 200) {
                return ApiResponse.error(response.statusCode(), String.valueOf(data.getOrDefault("error", "助手服务异常")));
            }
            return ApiResponse.success(data);
        } catch (InterruptedException error) {
            Thread.currentThread().interrupt();
            return ApiResponse.error(503, "助手请求已中断");
        } catch (IOException error) {
            return ApiResponse.error(503, "助手服务暂不可用");
        }
    }
}
