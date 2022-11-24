package de.hermetic.types;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum PumpState {
    FULLY_OPERATIONAL(0),
    REDUCED_POWER(1),
    WARNING(2),
    STOPPED(3),
    UNKNOWN(4);

    @Getter
    private int customOrdinal;
}
