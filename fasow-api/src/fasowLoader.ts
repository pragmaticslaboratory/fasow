import ExperimentAgentCombination from 'src/calibrations/CalibrationAgentCombinatio/ExperimentAgentCombination';
import ExperimentAgentCombinationBestSeed from 'src/calibrations/CalibrationAgentCombinatio/ExperimentAgentCombinationBestSeed';
import ExampleExperiment from '././calibrations/ExampleExperiment';
import TestExperiment from '././calibrations/./CalibrationTest/TestExperiment';
import MessageRepetition from '././calibrations/./CalibrationEffectMessageRepetition/MessageRepetition';

const fasowConfig = [
  ExperimentAgentCombination,
  ExperimentAgentCombinationBestSeed,
  MessageRepetition,
  ExampleExperiment,
  /** Add your Experiments below **/
  TestExperiment,
];

export default fasowConfig;
