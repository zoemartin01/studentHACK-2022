import {Grid, Card, Badge, Group} from "@mantine/core";

import Api from "src/api";
import {PumpState, pumpStateToColor, pumpStateToString} from "../../src/types";

export default function() {
    return <>
        <Grid>
            {Api.getPumps().filter(value => value.state < PumpState.Unknown).map((pump) => (
                <Grid.Col span={4} key={pump.company + pump.name}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Group position="apart" mt="md" mb="xs">
                            {pump.company.concat(" - ", pump.name)}
                            <Badge color={pumpStateToColor(pump.state)}>
                                {pumpStateToString(pump.state)}
                            </Badge>
                        </Group>
                    </Card>
                </Grid.Col>
            ))}
        </Grid>
    </>;
}