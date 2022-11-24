import {Pump, PumpState} from "./types";

interface Api {
    getPumps: () => Pump[];
}

const MockApi: Api = {
    getPumps() {
        return [{
            name: "Pumpe 1",
            state: PumpState.FullyOperational
        }, {
            name: "Pumpe 2",
            state: PumpState.ReducedPower
        }, {
            name: "Pumpe 3",
            state: PumpState.Warning
        }, {
            name: "Pumpe 4",
            state: PumpState.Stopped
        }, {
            name: "Pumpe 5",
            state: PumpState.Unknown
        }]
    }
}

export default MockApi;
