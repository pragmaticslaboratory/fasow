import { FormControlLabel, Grid, Switch, Typography } from "@mui/material";

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
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Switch checked />}
            label="Essential Data"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel
            control={<Switch checked onChange={() => {}} />}
            label="Detailed Data"
          />
        </Grid>
      </Grid>
    </div>
  );
}
