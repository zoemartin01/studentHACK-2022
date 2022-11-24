import {PumpState, pumpStateToColor, pumpStateToString} from "./types";
import {showNotification} from "@mantine/notifications";

import Api from "./api";

export default function warn() {
    return Api.getPumps()
        .filter(value => (value.state < PumpState.Unknown && value.state > PumpState.FullyOperational))
        .map((pump) => showNotification({
                title: pumpStateToString(pump.state),
                color: pumpStateToColor(pump.state),
                message: 'State of '.concat(pump.name, ' of ', pump.company, ' is: ' , pumpStateToString(pump.state)),
                autoClose: 5000,
                key: pump.company.concat(pump.name)
            })
        )
}

export function warn2() {
    Api.getPumps().forEach(value => {
        value.state = PumpState.FullyOperational;
    });

    Api.getPumps()[2].state = PumpState.Warning;

    return Api.getPumps()
        .filter(value => (value.state < PumpState.Unknown && value.state > PumpState.FullyOperational))
        .map((pump) => showNotification({
                title: pumpStateToString(pump.state),
                color: pumpStateToColor(pump.state),
                message: 'State of '.concat(pump.name, ' of ', pump.company, ' is: ' , pumpStateToString(pump.state)),
                autoClose: 5000,
                key: pump.company.concat(pump.name)
            })
        )
}