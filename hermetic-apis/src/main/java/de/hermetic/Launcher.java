package de.hermetic;

import de.hermetic.data.Sheesh;
import de.hermetic.domain.DataStreamService;
import de.hermetic.domain.PumpInventoryService;
import de.hermetic.system.PumpMetricsService;

import java.net.InetSocketAddress;

public class Launcher {

    public static void main(String[] args) {
        Sheesh.loadData();

        final PortConfig portConfig = PortConfig.builder()
                .pumpMetricsService(InetSocketAddress.createUnresolved("localhost", 7070))
                .dataStreamService(InetSocketAddress.createUnresolved("localhost", 7071))
                .pumpInventoryService(InetSocketAddress.createUnresolved("localhost", 7072))
                .build();

        Thread SPumpMetrics = new Thread(new PumpMetricsService(portConfig));
        Thread DPumpInventory = new Thread(new PumpInventoryService(portConfig));
        Thread DDataStream = new Thread(new DataStreamService(portConfig));

        SPumpMetrics.setName("S-PumpMetrics");
        DPumpInventory.setName("D-PumpInventory");
        DDataStream.setName("D-DataStream");

        SPumpMetrics.start();
        DPumpInventory.start();
        DDataStream.start();
    }
    
}
