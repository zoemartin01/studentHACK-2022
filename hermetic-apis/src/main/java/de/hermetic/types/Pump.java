package de.hermetic.types;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Pump {
    private String id;
    private String company;
    private String name;
    private PumpState state;
}
