import ExperimentAgentCombination from 'src/experiments/ExperimentAgentCombinatio/ExperimentAgentCombination';
import ExperimentAgentCombinationBestSeed from 'src/experiments/ExperimentAgentCombinatio/ExperimentAgentCombinationBestSeed';
import ExampleExperiment from './experiments/ExampleExperiment';
import TestExperiment from './experiments/TestExperiment/TestExperiment';
import MessageRepetition from './experiments/ExperimentEffectMessageRepetition/MessageRepetition';

const fasowConfig = [
  ExperimentAgentCombination,
  ExperimentAgentCombinationBestSeed,
  MessageRepetition,
  ExampleExperiment,
  /** Add your Experiments below **/
  TestExperiment,
];

export default fasowConfig;
