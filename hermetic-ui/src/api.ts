import {Pump, PumpState} from "./types";

interface Api {
    getPumps: () => Pump[];
}

const MockApi: Api = {
    getPumps() {
        return [{
            name: "Pumpe 1",
            state: PumpState.FullyOperational
        }]
    }
}

export default MockApi;
