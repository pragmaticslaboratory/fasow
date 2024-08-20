import { Box, Typography } from "@mui/material";

import MetaExperimentConfig from "@fasow/backend/src/fasow/config/metaconfig/MetaExperimentConfig";
import ExperimentForm from "./ExperimentForm";
import ExperimentSelector from "./ExperimentSelector";

interface IProps {
    experiments: any[];
    setExperiment: (name: string) => void;
    experimentConfig: MetaExperimentConfig | undefined;
}

export default function ExperimentConfigurationBox({
    experiments,
    setExperiment,
    experimentConfig
}: IProps) {

  return (
    <Box>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        Set the configuration for the current experiment.
      </Typography>
      <Box sx={{ height: 16 }} />
      <ExperimentSelector
        setExperiment={setExperiment}
        experiments={experiments}
      />
      <ExperimentForm experimentConfig={experimentConfig} />
    </Box>
  );
}
