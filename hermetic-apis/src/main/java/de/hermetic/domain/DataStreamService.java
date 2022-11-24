package de.hermetic.domain;

import de.hermetic.PortConfig;
import de.hermetic.data.Sheesh;
import io.javalin.Javalin;
import io.javalin.websocket.WsConnectContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@RequiredArgsConstructor
public class DataStreamService implements Runnable {

    private final PortConfig portConfig;

    @Override
    public void run() {
        Javalin ignored = Javalin.create()
                .get("/", ctx -> ctx.result("Hello World from D-DataStream"))
                .ws("/data/{pump}", ws -> ws.onConnect(this::handleSocket))
                .start(portConfig.getDataStreamService().getHostName(), portConfig.getDataStreamService().getPort());
    }

    public void handleSocket(WsConnectContext ctx) {
        String pump = ctx.pathParam("pump");
        ctx.send("{\"x\": \"OK\", \"p\": \"" + pump + "\"}");

        while (true) {
            if (!Sheesh.isStreaming()) {
                Thread.yield();
            } else {
                AtomicInteger counter = new AtomicInteger(0);
                ScheduledFuture<?> scheduledFuture = new ScheduledThreadPoolExecutor(1).scheduleAtFixedRate(() -> {
                    int newCounterValue = counter.getAndIncrement();
                    if (newCounterValue > 19150) {
                        Sheesh.stopStreaming();
                        return;
                    }

                    String dataPointJSON = Sheesh.getDataPointJSON(
                            Sheesh.getNoisyData(),
                            newCounterValue,
                            Sheesh.WINDING_W_POS,
                            Sheesh.CURRENT_POS,
                            Sheesh.CURRENT_POS
                    );

                    ctx.send("{\"x\": \"data\", \"p\": " + dataPointJSON + "}");
                }, 0, 20, TimeUnit.MILLISECONDS);
                Sheesh.addStream(scheduledFuture);
                break;
            }
        }
    }
}
