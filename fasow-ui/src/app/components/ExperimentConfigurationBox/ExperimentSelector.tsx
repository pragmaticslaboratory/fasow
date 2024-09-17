"use client"
import {ChangeEvent, useEffect, useState} from "react";

import { Box, TextField, Typography } from "@mui/material";

interface IProps {
  experiments: any[];
  setExperiment: (name: string) => void;
  selectedExperiment;
}

export default function ExperimentSelector({
  selectedExperiment,
  experiments,
  setExperiment,
}: IProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setExperiment(event.target.value);
  };


  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="overline">Experiment</Typography>
      <TextField
        id="outlined-select-currency-native"
        select
        label="Experiment to Simulate"
        value={selectedExperiment}
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
