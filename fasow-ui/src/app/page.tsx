"use client"
import {createTheme, Fab, Grid2, ThemeProvider} from "@mui/material";
import NavBar from "@fasow-ui/app/components/NavBar";
import HomeBox from "@fasow-ui/app/components/HomeBox";
import ExperimentConfigurationBox from "@fasow-ui/app/components/ExperimentConfigurationBox";
import AgentConfigurationBox from "@fasow-ui/app/components/AgentConfigurationBox";
import DataHandlerOutputBox from "@fasow-ui/app/components/DataHandlerOutputBox";
import {PlayArrow} from "@mui/icons-material";
import {useEffect} from "react";
import {RequestGetState, RequestPostRunExperiment, useExperiments} from "@fasow-ui/app/hooks/useFasow";

/*
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
*/
export default function Home() {

  const { experimentConfig, experiments, setExperiment } = useExperiments();
  // const { results, runExperiment } = useRunExperiment();

  /*
  useEffect( () => {
    RequestPostRunExperiment().then((r)=> {
      console.log("Start Run Exp")
      console.log(r)
      console.log("End Run Exp")
    });

    RequestGetState().then((r)=> {
      console.log("Start GET STATE")
      console.log(r)
      console.log("End GET STATE")
    });

  }, []); */

  return (
    <div >
      <div className="App">
        <NavBar />
        <div className="app-content">
          <Grid2 container spacing={1} sx={{ height: "100%" }}>
            <Grid2 item xs={6} sx={{ height: "50%" }}>
              <HomeBox title="Experiment configuration">
                {/*<ExperimentConfigurationBox experiments={} setExperiment={} experimentConfig={}/>*/}
                <ExperimentConfigurationBox  experiments={experiments} setExperiment={setExperiment} experimentConfig={experimentConfig}/>
              </HomeBox>
            </Grid2>
            <Grid2 item xs={6} sx={{ height: "50%" }}>
              <HomeBox title="Agent configuration">
                {/*<AgentConfigurationBox experimentConfig={}/>*/}
              </HomeBox>
            </Grid2>
            <Grid2 item xs={12} sx={{ height: "50%" }}>
              <HomeBox title="Data handler output">
                {/*<DataHandlerOutputBox results={} />*/}
              </HomeBox>
            </Grid2>
          </Grid2>
        </div>
      </div>
      <Fab
        color="primary"
        variant="extended"
        aria-label="add"
        onClick={() => {} }
        sx={{ position: "absolute", bottom: 108, right: 72 }}
      >
        <PlayArrow sx={{ mr: 1 }} />
        Run experiment
      </Fab>
    </div>
  );
}
