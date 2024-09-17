import { Box, Typography } from "@mui/material";

import ExperimentSelector from "./ExperimentSelector";
import ExperimentForm from "@fasow-ui/app/components/ExperimentConfigurationBox/ExperimentForm";

interface IProps {
    experiments: any[];
    setExperiment: (name: string) => void;
    experimentConfig?;// MetaExperimentConfig | undefined;
  selectedExperiment;
}

export default function ExperimentConfigurationBox({
    experiments,
    setExperiment,
    experimentConfig,
    selectedExperiment
}: IProps) {

  return (
    <Box>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        Set the configuration for the current experiment.
      </Typography>
      <Box sx={{ height: 16 }} />
      <ExperimentSelector
        selectedExperiment={selectedExperiment}
        setExperiment={setExperiment}
        experiments={experiments}
      />
      {<ExperimentForm experimentConfig={experimentConfig} />}
    </Box>
  );
}
