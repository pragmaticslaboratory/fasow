import { ChangeEvent, useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

function Spacing() {
  return <Box sx={{ height: 12 }} />;
}

const actionsArray = ["read", "share"];

export default function AgentActions() {
  const [selectedAction, setSelectedAction] = useState("read");

  const handleChangeSelectAction = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedAction(event.target.value);
  };

  // Return an action by the selected action value //todo check this other hardcoding ....
  // const getAction = (index: number) => {
  //   if (selectedAction === "read") {
  //     return {
  //       id: index,
  //       actionName: "read",
  //       actionProbability: 0,
  //       actionType: "ActionRead",
  //     };
  //   }
  //   return {
  //     id: index,
  //     actionName: "share",
  //     actionProbability: 0,
  //     actionType: "ActionShare",
  //   };
  // };

  // Handle the event of click on add action button, and obviously add the action to the rows.
  const onClickAddAction = () => {};

  // Columns structure and functionality
  const columns: GridColDef[] = [
    {
      field: "actionName",
      headerName: "Action Name",
      width: 150,
    },
    {
      field: "actionProbability",
      headerName: "Action Probability (%)",
      width: 300,
      editable: true,
      renderCell: () => 20,
      renderEditCell: () => (
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Slider
              step={0.0001}
              min={0}
              max={100}
              sx={{
                marginLeft: "5px",
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField fullWidth required variant="outlined" type="number" />
          </Grid>
        </Grid>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 80,
      renderCell: () => (
        <Button>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="overline">Type of action</Typography>
      <Spacing />
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          select
          label="Action"
          value={selectedAction}
          onChange={handleChangeSelectAction}
          sx={{ flex: 1, marginRight: 1 }}
        >
          {actionsArray.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={onClickAddAction} variant="contained">
          <AddIcon />
        </Button>
      </Box>
      <Spacing />
      <Spacing />
      <Typography variant="overline">Actions</Typography>
      <Spacing />
      <Grid item xs={12}>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={[]}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
    </Box>
  );
}
