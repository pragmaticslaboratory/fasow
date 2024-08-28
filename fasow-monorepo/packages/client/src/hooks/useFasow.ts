/* eslint-disable import/prefer-default-export */
import { useCallback, useState } from "react";

import { fasowInstance } from "@fasow/backend";
import MetaExperimentConfig from "@fasow/backend/src/fasow/config/metaconfig/MetaExperimentConfig";

export const useExperiments = () => {
  const [experimentConfig, setExperimentConfig] = useState<MetaExperimentConfig>();
  const { state } = fasowInstance.getState();
  const { experiments } = state;

  // @ts-ignore
  const formattedExperiments = experiments.map(({ type }) => type);

  const setExperiment = (
    experimentName: typeof formattedExperiments[number]
  ) => {
    fasowInstance.selectExperimentByName(experimentName).then(() => fasowInstance.initializeSelectedExperiment());

    const config = fasowInstance.getExperimentConfig();
    setExperimentConfig({ ...config });
  };

  return {
    experiments: formattedExperiments,
    setExperiment,
    experimentConfig
  } as const;
};

export const useRunExperiment = () => {
  const [results, setResults] = useState<any[]>([]);

  const runExperiment = useCallback(async () => {
    await fasowInstance.runSelectedExperiment();
    const output = fasowInstance.getDataHandler().clearOutput();
    setResults(output);
  }, []);

  return {
    runExperiment,
    results,
  };
};
