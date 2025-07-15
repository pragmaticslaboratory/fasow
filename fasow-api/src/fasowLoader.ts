import ExperimentAgentCombination from 'src/calibrations/ExperimentAgentCombinatio/ExperimentAgentCombination';
import ExperimentAgentCombinationBestSeed from 'src/calibrations/ExperimentAgentCombinatio/ExperimentAgentCombinationBestSeed';
import ExampleCalibration from './calibrations/ExampleCalibration';
import TestCalibration from './calibrations/TestCalibration/TestCalibration';
import MessageRepetition from '././calibrations/././case2/MessageRepetition';

const fasowConfig = [
  ExperimentAgentCombination,
  ExperimentAgentCombinationBestSeed,
  MessageRepetition,
  ExampleCalibration,
  /** Add your Experiments below **/
  TestCalibration,
];

export default fasowConfig;
