import Shell from "../components/AppShell";
import {MantineProvider} from "@mantine/core";

const LocalPage = function() {
    return <MantineProvider theme={{ colorScheme: 'light' }} withGlobalStyles withNormalizeCSS>
        <Shell/>
    </MantineProvider>;
}

export default LocalPage;