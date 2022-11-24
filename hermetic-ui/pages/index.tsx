import Shell from "../components/AppShell";
import {MantineProvider} from "@mantine/core";
import {NotificationsProvider, showNotification} from "@mantine/notifications";
import {useEffect} from "react";
import Api from "../src/api";
import {PumpState, pumpStateToColor, pumpStateToString} from "../src/types";

const LocalPage = function () {
  useEffect(() => {
    Api.getPumps().filter(value => (value.state < PumpState.Unknown && value.state > PumpState.FullyOperational))
        .map((pump) => showNotification({
          title: pumpStateToString(pump.state),
          color: pumpStateToColor(pump.state),
          message: 'State of '.concat(pump.name, ' of ', pump.company, ' is: ' , pumpStateToString(pump.state)),
          autoClose: 30000,
          key: pump.company.concat(pump.name)
        })
    )
  }, [])
  return (
    <MantineProvider
      theme={{ colorScheme: "light" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider position={"bottom-right"}>
        <Shell />
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default LocalPage;
