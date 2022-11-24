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
                autoClose: 30000,
                key: pump.company.concat(pump.name)
            })
        )
}