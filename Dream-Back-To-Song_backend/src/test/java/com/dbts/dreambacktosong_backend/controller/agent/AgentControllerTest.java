package com.dbts.dreambacktosong_backend.controller.agent;

import com.sun.net.httpserver.HttpServer;
import org.junit.jupiter.api.Test;

import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.io.ByteArrayOutputStream;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

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

    @Test
    void streamsEventsWithoutBufferingTheWholeResponse() throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        CountDownLatch releaseSecond = new CountDownLatch(1);
        server.createContext("/sessions/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/turns/bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/events", exchange -> {
            assertEquals("3", exchange.getRequestURI().getQuery().substring(6));
            byte[] first = "id: 4\nevent: text_delta\ndata: {\"delta\":\"你好\"}\n\n".getBytes(StandardCharsets.UTF_8);
            byte[] second = "id: 5\nevent: turn_completed\ndata: {}\n\n".getBytes(StandardCharsets.UTF_8);
            exchange.getResponseHeaders().add("Content-Type", "text/event-stream");
            exchange.sendResponseHeaders(200, 0);
            exchange.getResponseBody().write(first);
            exchange.getResponseBody().flush();
            try {
                releaseSecond.await(2, TimeUnit.SECONDS);
            } catch (InterruptedException error) {
                Thread.currentThread().interrupt();
            }
            exchange.getResponseBody().write(second);
            exchange.close();
        });
        server.start();
        try {
            AgentController controller = new AgentController("http://127.0.0.1:" + server.getAddress().getPort());
            var response = controller.events("a".repeat(32), "b".repeat(32), 3);
            assertEquals("text/event-stream", response.getHeaders().getContentType().toString());
            ByteArrayOutputStream output = new ByteArrayOutputStream();
            ExecutorService executor = Executors.newSingleThreadExecutor();
            try {
                var future = executor.submit(() -> {
                    try {
                        response.getBody().writeTo(output);
                    } catch (Exception error) {
                        throw new RuntimeException(error);
                    }
                });
                long deadline = System.nanoTime() + TimeUnit.SECONDS.toNanos(1);
                while (output.size() == 0 && System.nanoTime() < deadline) {
                    Thread.sleep(10);
                }
                assertTrue(output.toString(StandardCharsets.UTF_8).contains("text_delta"));
                releaseSecond.countDown();
                future.get(2, TimeUnit.SECONDS);
            } finally {
                releaseSecond.countDown();
                executor.shutdownNow();
            }
            String body = output.toString(StandardCharsets.UTF_8);
            assertTrue(body.contains("text_delta"));
            assertTrue(body.contains("turn_completed"));
        } finally {
            server.stop(0);
        }
    }
}
