import MetaExperimentConfig from "@fasow/backend/src/fasow/config/metaconfig/MetaExperimentConfig";
import { Box, TextField, Typography } from "@mui/material";

function Spacing() {
  return <Box sx={{ height: 12 }} />;
}

interface IProps {
  experimentConfig: MetaExperimentConfig | undefined;
}

export default function ExperimentForm({ experimentConfig }: IProps) {
  return (
    <Box>
      <Spacing />
      <Typography variant="overline">Name</Typography>
      <TextField
        fullWidth
        type="text"
        disabled
        value={experimentConfig?.name}
      />
      <Spacing />
      <Typography variant="overline">Description</Typography>
      <TextField
        fullWidth
        multiline
        disabled
        type="text"
        value={experimentConfig?.description}
      />
      <Spacing />
      <Typography variant="overline">Max. repetitions</Typography>
      <TextField
        fullWidth
        required
        type="number"
        disabled
        value={experimentConfig?.maxRepetitions}
      />
      <Spacing />
      <Typography variant="overline">Network size</Typography>
      <TextField
        fullWidth
        disabled
        type="number"
        value={experimentConfig?.environmentConfig.networkSize}
      />
      <Spacing />
      <Typography variant="overline">Max. ticks</Typography>
      <TextField
        fullWidth
        type="number"
        disabled
        value={experimentConfig?.environmentConfig.maxTick}
      />
    </Box>
  );
}
