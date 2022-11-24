import { Grid, Select } from "@mantine/core";
import { useState } from "react";

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
            data={["pump1", "pump2", "pump3"]}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12}>
          {company &&
            pump === "pump1" &&
            [10, 2, 4, 6, 8].map((i) => (
              <iframe
                key={i}
                src={`http://localhost:3003/d-solo/pump1/pump1?orgId=1&from=1667815664000&to=1667834869000&theme=light&panelId=${i}`}
                width="100%"
                height="40%"
                frameBorder="0"
              />
            ))}
          {company &&
            pump === "pump2" &&
            [10, 2, 4, 6, 8].map((i) => (
              <iframe
                key={i}
                src={`http://localhost:3003/d-solo/pump2/pump2?orgId=1&from=1667815664000&to=1667834869000&theme=light&panelId=${i}`}
                width="100%"
                height="40%"
                frameBorder="0"
              />
            ))}
        </Grid.Col>
      </Grid>
    </>
  );
}
