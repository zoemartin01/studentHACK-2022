import {
  Badge,
  Card,
  Divider,
  Grid,
  Group,
  Paper,
  ScrollArea,
  Select,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { Fragment, useState } from "react";

export default function () {
  const [pump, setPump] = useState("");
  const [company, setCompany] = useState("");

  return (
    <>
      <Grid>
        <Grid.Col span={3}>
          <Select
            searchValue={company}
            searchable
            onSearchChange={setCompany}
            nothingFound="No options"
            placeholder="Select company"
            label="Company"
            data={["studentec", "Hermetic", "KIT Campus Nord"]}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <Select
            searchValue={pump}
            searchable
            onSearchChange={setPump}
            nothingFound="No options"
            placeholder="Select pump"
            label="Pump"
            data={["Pump 1", "Pump 2", "Pump 3"]}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12}>
          {company && pump === "Pump 1" && (
            <Paper shadow="sm" p="lg" radius="md" withBorder>
              <ScrollArea>
                {[10, 2, 4, 6, 8].map((val, idx) => (
                  <Fragment key={val}>
                    <iframe
                      key={val}
                      src={`http://localhost:3003/d-solo/pump1/pump1?orgId=1&from=1667815664000&to=1667834869000&theme=light&panelId=${val}`}
                      width="100%"
                      height="300px"
                      style={{ border: 0 }}
                    />
                    {idx !== 4 && <Divider my="sm" />}
                  </Fragment>
                ))}
              </ScrollArea>
            </Paper>
          )}
          {company && pump === "Pump 2" && (
            <Paper shadow="sm" p="lg" radius="md" withBorder>
              <ScrollArea>
                {[10, 2, 4, 6, 8].map((val, idx) => (
                  <Fragment key={val}>
                    <iframe
                      key={val}
                      src={`http://localhost:3003/d-solo/pump2/pump2?orgId=1&from=1667815664000&to=1667834869000&theme=light&panelId=${val}`}
                      width="100%"
                      height="300px"
                      style={{ border: 0 }}
                    />
                    {idx !== 4 && <Divider my="sm" />}
                  </Fragment>
                ))}
              </ScrollArea>
            </Paper>
          )}
          {company && pump === "Pump 3" && (
            <Card shadow="sm" p="lg" radius="md" withBorder>
              <Group position="apart" mt="md" mb="xs">
                Pump 3
                <Badge color="red">
                  <Text>No historical data available</Text>
                </Badge>
              </Group>
            </Card>
          )}
        </Grid.Col>
      </Grid>
    </>
  );
}
