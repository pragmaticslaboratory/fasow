import { PlayArrow } from "@mui/icons-material";
import { Fab, Grid, ThemeProvider, createTheme } from "@mui/material";

import AgentConfigurationBox from "./components/AgentConfigurationBox";
import DataHandlerOutputBox from "./components/DataHandlerOutputBox";
import ExperimentConfigurationBox from "./components/ExperimentConfigurationBox";
import HomeBox from "./components/HomeBox";
import NavBar from "./components/NavBar";
import {useExperiments, useRunExperiment} from "./hooks/useFasow";
import "./index.css";

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

function App() {
  const { experimentConfig, experiments, setExperiment } = useExperiments();
  const { results, runExperiment } = useRunExperiment();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NavBar />
        <div className="app-content">
          <Grid container spacing={1} sx={{ height: "100%" }}>
            <Grid item xs={6} sx={{ height: "50%" }}>
              <HomeBox title="Experiment configuration">
                <ExperimentConfigurationBox experiments={experiments} setExperiment={setExperiment} experimentConfig={experimentConfig}/>
              </HomeBox>
            </Grid>
            <Grid item xs={6} sx={{ height: "50%" }}>
              <HomeBox title="Agent configuration">
                <AgentConfigurationBox experimentConfig={experimentConfig}/>
              </HomeBox>
            </Grid>
            <Grid item xs={12} sx={{ height: "50%" }}>
              <HomeBox title="Data handler output">
                <DataHandlerOutputBox results={results} />
              </HomeBox>
            </Grid>
          </Grid>
        </div>
      </div>
      <Fab
        color="primary"
        variant="extended"
        aria-label="add"
        onClick={() => runExperiment()}
        sx={{ position: "absolute", bottom: 108, right: 72 }}
      >
        <PlayArrow sx={{ mr: 1 }} />
        Run experiment
      </Fab>
    </ThemeProvider>
  );
}

export default App;
