package de.hermetic.domain;

import de.hermetic.PortConfig;
import io.javalin.Javalin;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PumpInventoryService implements Runnable {

    private final PortConfig portConfig;

    @Override
    public void run() {
        Javalin.create()
                .get("/", ctx -> ctx.result("Hello World from D-PumpInventory"))
                .start(portConfig.getPumpInventoryService().getHostName(), portConfig.getPumpInventoryService().getPort());
    }


}
