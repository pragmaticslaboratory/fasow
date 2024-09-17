import { FormControlLabel, Grid2, Switch, Typography } from "@mui/material";

// import { useExperimentConfigContext } from "../../../context/ExperimentConfigProvider";
// import { ExperimentReducerTypes } from "../../../context/reducer/types/ExperimentReducerTypes";

export default function DataHandlerOptionsCard() {
  // const { experimentConfig, dispatch } = useExperimentConfigContext();

  // const handleDetailedChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   dispatch({
  //     type: ExperimentReducerTypes.setDetailedData,
  //     value: event.target.checked,
  //   });
  // };

  return (
    <div>
      <Typography variant="overline">Data output</Typography>
      <Grid2 container spacing={1}>
        <Grid2 item xs={6}>
          <FormControlLabel
            control={<Switch checked />}
            label="Essential Data"
          />
        </Grid2>
        <Grid2 item xs={6}>
          <FormControlLabel
            control={<Switch checked onChange={() => {}} />}
            label="Detailed Data"
          />
        </Grid2>
      </Grid2>
    </div>
  );
}
