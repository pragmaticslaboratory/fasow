import {  useMemo } from "react";

// import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Switch, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MetaExperimentConfig from "@fasow/backend/src/fasow/config/metaconfig/MetaExperimentConfig";

interface IProps {
  experimentConfig: MetaExperimentConfig | undefined;
}

export default function AgentConfigurationBox({experimentConfig}: IProps) {

  const rows = useMemo(
    () =>
      experimentConfig?.environmentConfig.metaAgentsConfigs.sort(
        (a, b) => a.id - b.id
      ) ?? [],
    [experimentConfig]
  );


  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 130,
    },
    {
      field: "name",
      headerName: "Config Name",
      minWidth: 130,
    },
    {
      field: "followersPercentage",
      headerName: "Followers percentage (%)",
      width: 200,
    },
    {
      field: "isSeed",
      headerName: "isSeed",
      width: 70,
      editable: false,
      renderCell: (params) => <Switch checked={params.value} />,
    },
    {
      field: "actionsConfigs",
      headerName: "Actions",
      width: 500,
      renderCell: ({ value }) => (
        <span>
          {value// @ts-ignore
            .map(({ name, probability }) => `${name} (${probability}%)`)
            .join(" | ")}
        </span>
      ),
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          marginBottom: 2,
        }}
      >
        <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
          Set the agents for the current experiment.
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pageSize={5}
          rowsPerPageOptions={[5]}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      {/* <NewAgentModal
        visible={newAgentModalVisible}
        hide={() => setNewAgentModalVisible(false)}
      /> */}
    </>
  );
}
