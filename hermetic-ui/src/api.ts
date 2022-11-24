import {Pump, PumpState} from "./types";

interface Api {
    getPumps: () => Pump[];
}

const MockApi: Api = {
    getPumps() {
        return [{
            name: "Pump 1",
            company: "studentec",
            state: PumpState.FullyOperational
        }, {
            name: "Pump 1",
            company: "Hermetic",
            state: PumpState.ReducedPower
        }, {
            name: "Pump 2",
            company: "Hermetic",
            state: PumpState.Warning
        }, {
            name: "Pump 1",
            company: "KIT Campus Nord",
            state: PumpState.Stopped
        }, {
            name: "Pump 2",
            company: "KIT Campus Nord",
            state: PumpState.Unknown
        }, {
            name: "Pump 3",
            company: "KIT Campus Nord",
            state: PumpState.Stopped
        }]
    }
}

export default MockApi;
