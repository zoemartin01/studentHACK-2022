package de.hermetic.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.hermetic.PortConfig;
import de.hermetic.data.DataContainer;
import de.hermetic.data.Sheesh;
import io.javalin.Javalin;
import io.javalin.websocket.WsConnectContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicBoolean;
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
                AtomicBoolean isCavitating = new AtomicBoolean(false);
                ScheduledFuture<?> scheduledFuture = new ScheduledThreadPoolExecutor(1).scheduleAtFixedRate(() -> {
                    int newCounterValue = counter.getAndIncrement();
                    if (newCounterValue > 19150) {
                        Sheesh.stopStreaming();
                        return;
                    }

                    DataContainer.DataPoint[] dataPoint = Sheesh.getDataPoint(
                            Sheesh.getNoisyData(),
                            newCounterValue,
                            Sheesh.WINDING_W_POS,
                            Sheesh.CURRENT_POS,
                            Sheesh.SLIP_POS
                    );

                    if (newCounterValue > 1000 && newCounterValue < 19000 && !isCavitating.get() && dataPoint[1].getValue() * dataPoint[2].getValue() < 600) {
                        System.out.println("CAVITATION! " + newCounterValue);
                        ctx.send("{\"x\": \"cavitation\", \"p\": " + newCounterValue + "}");
                        isCavitating.set(true);
                    } else if (isCavitating.get() && dataPoint[1].getValue() * dataPoint[2].getValue() > 600) {
                        isCavitating.set(false);
                    }

                    String dataPointJSON = null;
                    try {
                        dataPointJSON = Sheesh.MAPPER.writeValueAsString(dataPoint);
                    } catch (JsonProcessingException e) {
                        e.printStackTrace();
                    }

                    ctx.send("{\"x\": \"data\", \"p\": " + dataPointJSON + "}");
                }, 0, 2, TimeUnit.MILLISECONDS);
                Sheesh.addStream(scheduledFuture);

                break;
            }
        }
    }
}
