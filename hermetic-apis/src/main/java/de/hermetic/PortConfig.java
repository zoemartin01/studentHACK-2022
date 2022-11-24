package de.hermetic;

import lombok.Builder;
import lombok.Getter;

import java.net.InetSocketAddress;

@Getter
@Builder
public class PortConfig {
    private InetSocketAddress pumpMetricsService;
    private InetSocketAddress dataStreamService;
    private InetSocketAddress pumpInventoryService;
}
