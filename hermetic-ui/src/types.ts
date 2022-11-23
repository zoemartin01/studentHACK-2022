export enum PumpState {
    FullyOperational,
    ReducedPower,
    Warning,
    Stopped,
    Unknown
}

export interface Pump {
    name: string;
    state: PumpState;
}
