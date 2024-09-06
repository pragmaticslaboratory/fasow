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


export async function RequestPostSelectExperiment() {
  const url = 'http://localhost:3001/select/ExampleExperiment';

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

export async function RequestPostRunExperiment() {
  const url = 'http://localhost:3001/run/ExampleExperiment';

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

export const useExperiments = () => {
  //Todo maybe export fasow types could help here.

  const [experimentConfig, setExperimentConfig] = useState({});
  /*
  let response = undefined;
  RequestGetState().then(res => response = res)
  const { state } = response
  const { experiments } = state;
  const formattedExperiments = experiments.map(({ type }) => type);

   */

  const setExperiment = (
    experimentName: string
  ) => {

    let response = undefined;
    RequestGetState().then(res => response = res)
    const { state } = response
    const { experiments } = state;
    const formattedExperiments = experiments.map(({ type }) => type);
    //let data = undefined;
    // RequestPostSelectExperiment().then(r => data = r)
    let config = null
    RequestGetSelectedExperimentConfig().then(r => config = r)
    //const config = fasowInstance.getExperimentConfig();
    setExperimentConfig({ ...config });
  };

  return {
    experiments: [],
    setExperiment,
    experimentConfig
  } as const;
};

/*
export const useRunExperiment = () => {
  const [results, setResults] = useState<any[]>([]);

  const runExperiment = useCallback(async () => {

    const output = await RequestPostRunExperiment()
    setResults(output);
  }, []);

  return {
    runExperiment,
    results,
  };
};

*/