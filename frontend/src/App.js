import React from "react";
import { Button, Box, Grid, Grommet, Text } from "grommet";
import { CirclePlay } from "grommet-icons";

const App = () => (
  <Grommet plain full>
    <Grid fill gap="small" rows={["auto", "flex", "auto"]}>
      <Grid fill columns={["auto", "flex", "auto"]}>
        <Text alignSelf="start">happy</Text>
        <Text> </Text>
        <Text alignSelf="end">14</Text>
      </Grid>

      <Grid
        rows={["auto", "auto"]}
        columns={["auto", "auto"]}
        gap="medium"
        areas={[
          { name: "a", start: [0, 0], end: [1, 0] },
          { name: "b", start: [1, 0], end: [1, 1] },
          { name: "x", start: [0, 1], end: [0, 1] },
          { name: "y", start: [1, 1], end: [1, 1] }
        ]}
      >
        <Box gridArea="a" background="brand">
          a
        </Box>
        <Box gridArea="b" background="accent-1">
          b
        </Box>
        <Box gridArea="x" background="accent-2">
          x
        </Box>
        <Box gridArea="y" background="accent-4">
          y
        </Box>
      </Grid>

      <Button icon={<CirclePlay />} primary label="Check" onClick={() => {}} />
    </Grid>
  </Grommet>
);

export default App;
