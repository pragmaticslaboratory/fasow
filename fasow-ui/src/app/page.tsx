"use client"
import {createTheme, Fab, Grid2, ThemeProvider} from "@mui/material";
import NavBar from "@fasow-ui/app/components/NavBar";
import HomeBox from "@fasow-ui/app/components/HomeBox";
import ExperimentConfigurationBox from "@fasow-ui/app/components/ExperimentConfigurationBox";
import AgentConfigurationBox from "@fasow-ui/app/components/AgentConfigurationBox";
import DataHandlerOutputBox from "@fasow-ui/app/components/DataHandlerOutputBox";
import {PlayArrow} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {
  useFASOW
} from "@fasow-ui/app/hooks/useFasow";


const theme = createTheme({
  palette: {
    primary: {
      light: "#6ec6ff",
      main: "#2196f3",
      dark: "#6ec6ff",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ffc947",
      main: "#ff9800",
      dark: "#c66900",
      contrastText: "#000",
    },
  },
});

export default function Home() {
  const fasowManager = useFASOW();

  useEffect( () => {
    fasowManager.operations.init();
    // fasowManager.operations.setExperiment(fasowManager.states.selectedExperiment);
  }, []);
  // console.log(fasowManager)
  return  <ThemeProvider theme={theme}>
    {fasowManager.states.isReady? <div >
    <div className="App">
      <NavBar />
      <div className="app-content">
        <Grid2 container spacing={2} height={'100vh'}>
          <Grid2 size={6} height={'50vh'} >
            <HomeBox title="Experiment configuration">
              <ExperimentConfigurationBox
                selectedExperiment={fasowManager.states.selectedExperiment}
                experiments={fasowManager.data.fasowState.state.experiments.map((exp) => exp.type)}
                setExperiment={fasowManager.operations.setExperiment}
                experimentConfig={fasowManager.data.experimentConfig}
              />
            </HomeBox>
          </Grid2>
          <Grid2 size={6} height={'50vh'}>
            <HomeBox title="Agent configuration">
              <AgentConfigurationBox
                experimentConfig={fasowManager.data.experimentConfig}
              />
            </HomeBox>
          </Grid2>
          <Grid2 size={12} height={'50vh'}>
            <HomeBox title="Data handler output">
              <DataHandlerOutputBox
                results={fasowManager.data.results}
              />
            </HomeBox>
          </Grid2>
        </Grid2>
      </div>
    </div>
    <Fab
      color="primary"
      variant="extended"
      aria-label="add"
      onClick={() => {
        fasowManager.operations.runSelectedExperiment()
      } }
      sx={{ position: "absolute", bottom: 108, right: 72 }}
    >
      <PlayArrow sx={{ mr: 1 }} />
      Run experiment
    </Fab>
  </div> : <>Loading...</>}
  </ThemeProvider>
}
