"use client"
import { useCallback, useState } from "react";

export async function RequestGetState() {
  const url = 'http://localhost:3001/getState';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': '*/*',
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();

  } catch (error) {
    console.error('Request failed', error);
    return null;
  }
}

export async function RequestGetSelectedExperimentConfig() {
  const url = 'http://localhost:3001/getSelectedExperimentConfig';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': '*/*',
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return response.json();

  } catch (error) {
    console.error('Request failed', error);
    return null;
  }
}


export async function RequestPostSelectExperiment(experimentName: string) {
  const url = `http://localhost:3001/select/${experimentName}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': '*/*',
      },
      body: ''
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Request failed', error);
    return null;
  }
}

export async function RequestPostRunExperiment(experimentName: string) {
  console.log(experimentName)
  const url = `http://localhost:3001/run/${experimentName}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': '*/*',
      },
      body: ''
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Request failed', error);
    return null;
  }
}

export const useFASOW = () => {
  //Todo maybe export fasow types could help here.


  const [fasowState, setFasowState] = useState({state:{selectedExperiment: "",experiments:[], actions:[], agent_states: [], agents:[]}})
  const [experiments, setExperiments] = useState([])
  const [experimentConfig, setExperimentConfig] = useState({})
  const [results, setResults] = useState([])

  const [isReady, setIsReady] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  const [selectedExperiment, setSelectedExperiment] = useState("")

  const init = () => {
    RequestGetState().then((state)=> {

      const {experiments, selectedExperimentState} = fasowState.state;
      setSelectedExperiment(selectedExperimentState)
      setFasowState(state);
      setExperiments(experiments);

      // getExp config
      RequestGetSelectedExperimentConfig().then((responseExperimentConfig) => {
        setExperimentConfig(responseExperimentConfig);
        console.log({responseExperimentConfig})
        RequestPostRunExperiment(selectedExperiment).then((responseRunExperiment)=> {
          console.log("responseRunExperiment",responseRunExperiment)
          //setResults(responseRunExperiment)
          setIsReady(true)
        });

      })
    })
  }

  const setExperiment = (
    experimentName: string
  ) => {
    RequestPostSelectExperiment(experimentName).then((res) => {
      RequestGetState().then((state)=> {

        const {experiments, selectedExperiment} = fasowState.state;
        setSelectedExperiment(selectedExperiment)
        setFasowState(state);
        setExperiments(experiments);

        // getExp config
        RequestGetSelectedExperimentConfig().then((responseExperimentConfig) => {
          setExperimentConfig(responseExperimentConfig);
        })
      })
    });
  };

  const runSelectedExperiment = () => {
    RequestPostRunExperiment(fasowState.state.selectedExperiment).then((responseRunExperiment)=> {
      setResults(responseRunExperiment)
    });
  }

  return {
    data: {
      fasowState: fasowState,
      experiments: experiments,
      experimentConfig: experimentConfig,
      results: results,
    },
    states: {
      selectedExperiment,
      isReady,
      isSelecting,
    },
    operations: {
      setExperiment,
      runSelectedExperiment,
      init
    }
  };
};