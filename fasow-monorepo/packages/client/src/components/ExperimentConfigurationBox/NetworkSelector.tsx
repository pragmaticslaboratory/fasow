import { Box, TextField, Typography } from "@mui/material";

// import { useExperimentConfigContext } from "../../context/ExperimentConfigProvider";
// import { ExperimentReducerTypes } from "../../context/reducer/types/ExperimentReducerTypes";

const networkOptions = [
  {
    value: "TwitterConfig",
    label: "Twitter",
  },
  {
    value: "FacebookConfig",
    label: "Facebook",
  },
];

export default function NetworkSelector() {
  // const { experimentConfig, dispatch } = useExperimentConfigContext();

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   dispatch({
  //     type: ExperimentReducerTypes.setExperimentType,
  //     value: event.target.value,
  //   });
  // };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="overline">Network</Typography>
      <TextField
        id="outlined-select-currency-native"
        select
        label="Network to Simulate"
        value={networkOptions[0].value}
        // value={experimentConfig.experimentType}
        // onChange={handleChange}
        SelectProps={{
          native: true,
        }}
        variant="filled"
        fullWidth
      >
        {networkOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </TextField>
    </Box>
  );
}
