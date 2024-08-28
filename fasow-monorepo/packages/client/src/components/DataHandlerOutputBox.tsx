import { Box, Typography } from "@mui/material";
import {DataGrid, GridColDef, GridToolbar} from "@mui/x-data-grid";


export default function DataHandlerOutputBox({
  results,
}: {
  results: any[];
}) {
  function getColumns( output : any[] ) : GridColDef[] {
    const columns : GridColDef[] = [];
    if(output.length>0){
      Object.keys(output[0]).forEach(key => {
        columns.push({
          field: key,
          headerName: key,
          width: 250
        })
      });
    }
    return columns;
  }
  
  return (
    <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
      <Typography variant="subtitle2" paddingBottom={2} color="GrayText">
        This is the output of the current experiment.
      </Typography>
      <DataGrid
        rows={results}
        columns={getColumns(results)}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        getRowId={() => Math.random().toString()}
        disableSelectionOnClick
        components={{Toolbar: GridToolbar}}
      />
    </Box>
  );
}
