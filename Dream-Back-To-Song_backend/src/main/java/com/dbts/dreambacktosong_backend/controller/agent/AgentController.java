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
