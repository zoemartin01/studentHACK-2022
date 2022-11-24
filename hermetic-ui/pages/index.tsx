import Shell from "../components/AppShell";
import {MantineProvider} from "@mantine/core";
import {NotificationsProvider} from "@mantine/notifications";
import {useEffect} from "react";

import WarningHelper from "../src/WarningHelper";
import warn from "../src/WarningHelper";

const LocalPage = function () {
  useEffect(() => {
    warn()
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
