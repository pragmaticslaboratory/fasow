import ExperimentAgentCombination from 'src/calibrations/ExperimentAgentCombinatio/ExperimentAgentCombination';
import ExperimentAgentCombinationBestSeed from 'src/calibrations/ExperimentAgentCombinatio/ExperimentAgentCombinationBestSeed';
import ExampleExperiment from '././calibrations/ExampleExperiment';
import TestExperiment from '././calibrations/TestExperiment/TestExperiment';
import MessageRepetition from '././calibrations/ExperimentEffectMessageRepetition/MessageRepetition';

const fasowConfig = [
  ExperimentAgentCombination,
  ExperimentAgentCombinationBestSeed,
  MessageRepetition,
  ExampleExperiment,
  /** Add your Experiments below **/
  TestExperiment,
];

export default fasowConfig;
