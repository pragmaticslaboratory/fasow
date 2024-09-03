import { MenuItem, Slider, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";

const typesArray = ["TwitterAgent", "FacebookAgent"];

function Spacing() {
  return <Box sx={{ height: 12 }} />;
}

export default function AgentConfig() {
  return (
    <Box>
      <Typography variant="overline">Basic info</Typography>
      <Spacing />
      <TextField fullWidth required label="Config Name" variant="outlined" />
      <Spacing />
      <TextField
        fullWidth
        required
        label="Initial State"
        variant="outlined"
        type="number"
      />
      <Spacing />
      <TextField
        fullWidth
        id="outlined-select-currency"
        select
        label="Agent Type"
        variant="outlined"
      >
        {typesArray.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Spacing />
      <Spacing />
      <Typography variant="overline">Network info</Typography>
      <Spacing />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          required
          label="Followers Percentage"
          variant="outlined"
          type="number"
          sx={{ flex: 2 }}
        />
        <Slider
          step={0.0001}
          min={0}
          max={100}
          sx={{ flex: 3, marginLeft: 3 }}
        />
      </Box>
      <Spacing />
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          required
          label="Following Percentage"
          variant="outlined"
          type="number"
          sx={{ flex: 2 }}
        />
        <Slider
          step={0.0001}
          min={0}
          max={100}
          sx={{ flex: 3, marginLeft: 3 }}
        />
      </Box>
    </Box>
  );
}
