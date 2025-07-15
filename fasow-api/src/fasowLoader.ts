import ExperimentAgentCombination from 'src/calibrations/ExperimentAgentCombinatio/ExperimentAgentCombination';
import ExperimentAgentCombinationBestSeed from 'src/calibrations/ExperimentAgentCombinatio/ExperimentAgentCombinationBestSeed';
import ExampleCalibration from './calibrations/ExampleCalibration';
import TestCalibration from './calibrations/TestCalibration/TestCalibration';
import Calibration2 from './calibrations/case2/Calibration2';

const fasowConfig = [
  ExperimentAgentCombination,
  ExperimentAgentCombinationBestSeed,
  Calibration2,
  ExampleCalibration,
  /** Add your Experiments below **/
  TestCalibration,
];

export default fasowConfig;
