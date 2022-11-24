package de.hermetic.system;

import de.hermetic.PortConfig;
import io.javalin.Javalin;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PumpMetricsService implements Runnable {

    private final PortConfig portConfig;

    @Override
    public void run() {
        Javalin.create()
                .get("/", ctx -> ctx.result("Hello World from S-PumpMetrics"))
                .start(portConfig.getPumpMetricsService().getHostName(), portConfig.getPumpMetricsService().getPort());
    }
}
