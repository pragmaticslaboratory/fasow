import ExperimentAgentCombination from 'src/experiments/ExperimentAgentCombinatio/ExperimentAgentCombination';
import ExperimentAgentCombinationBestSeed from 'src/experiments/ExperimentAgentCombinatio/ExperimentAgentCombinationBestSeed';
import ExampleExperiment from './experiments/ExampleExperiment';
import TestExperiment from './experiments/TestExperiment/TestExperiment';

const fasowConfig = [
  ExperimentAgentCombination,
  ExperimentAgentCombinationBestSeed,
  ExampleExperiment,
  /** Add your Experiments below **/
  TestExperiment,
];

export default fasowConfig;
