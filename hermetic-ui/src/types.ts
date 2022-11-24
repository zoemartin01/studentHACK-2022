export enum PumpState {
    FullyOperational,
    ReducedPower,
    Warning,
    Stopped,
    Unknown
}

export function pumpStateToString(state: PumpState): string {
    switch (state) {
        case PumpState.FullyOperational:
            return "Fully Operational";
        case PumpState.ReducedPower:
            return "Reduced Power";
        case PumpState.Warning:
            return "Warning";
        case PumpState.Stopped:
            return "Stopped";
        case PumpState.Unknown:
            return "Unknown";
    }
}

export function pumpStateToColor(state: PumpState): string {
    switch (state) {
        case PumpState.FullyOperational:
            return "green";
        case PumpState.ReducedPower:
            return "yellow";
        case PumpState.Warning:
            return "orange";
        case PumpState.Stopped:
            return "red";
        case PumpState.Unknown:
            return "grey";
    }
}

export interface Pump {
    name: string;
    state: PumpState;
}
