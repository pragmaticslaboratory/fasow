import {ChangeEvent, useEffect, useState} from "react";

import { Box, TextField, Typography } from "@mui/material";

interface IProps {
  experiments: any[];
  setExperiment: (name: string) => void;
}

export default function ExperimentSelector({
  experiments,
  setExperiment,
}: IProps) {
    const [init, setInit] = useState(false);
    const [selectedExperiment, setSelectedExperiment] = useState("ExampleExperiment");

    useEffect(() => {
        console.log({init})
        if(!init){
            setSelectedExperiment("ExampleExperiment");
            setExperiment(selectedExperiment);
            setInit(true);
        }
    },[init, selectedExperiment, setExperiment, setSelectedExperiment])
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedExperiment(event.target.value);
      setExperiment(event.target.value);
  };


  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="overline">Experiment</Typography>
      <TextField
        id="outlined-select-currency-native"
        select
        label="Experiment to Simulate"
        onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        variant="filled"
        fullWidth
      >
        {experiments.map((experiment) => (
          <option key={experiment} value={experiment}>
            {experiment}
          </option>
        ))}
      </TextField>
    </Box>
  );
}
