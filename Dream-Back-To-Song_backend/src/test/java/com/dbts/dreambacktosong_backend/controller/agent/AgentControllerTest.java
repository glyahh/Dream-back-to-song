package com.dbts.dreambacktosong_backend.controller.agent;

import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.Test;

import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;

class AgentControllerTest {
    @Test
    void forwardsBodyAndReportsFailureWithoutReplayingPost() throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        AtomicInteger calls = new AtomicInteger();
        server.createContext("/sessions", exchange -> {
            calls.incrementAndGet();
            assertEquals("POST", exchange.getRequestMethod());
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            assertTrue(body.contains("requestId"));
            byte[] response = "{\"error\":\"模型服务暂不可用\"}".getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(503, response.length);
            exchange.getResponseBody().write(response);
            exchange.close();
        });
        server.start();
        try {
            AgentController controller = new AgentController("http://127.0.0.1:" + server.getAddress().getPort());
            var result = controller.submit("a".repeat(32), Map.of("requestId", "same-id", "text", "下一步"));
            assertEquals(503, result.getCode());
            assertEquals("模型服务暂不可用", result.getMessage());
            assertEquals(1, calls.get());
        } finally {
            server.stop(0);
        }
    }

    @Test
    void refusesNonLoopbackGateway() {
        assertThrows(IllegalArgumentException.class, () -> new AgentController("http://example.com"));
    }
}
