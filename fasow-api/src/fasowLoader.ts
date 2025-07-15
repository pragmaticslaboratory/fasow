import CalibrationCase1 from 'src/calibrations/case1/CalibrationCase1';
import CalibrationCase1BestSeed from 'src/calibrations/case1/CalibrationCase1BestSeed';
import ExampleCalibration from './calibrations/ExampleCalibration';
import TestCalibration from './calibrations/TestCalibration/TestCalibration';
import Calibration2 from './calibrations/case2/Calibration2';

const fasowConfig = [
  CalibrationCase1,
  CalibrationCase1BestSeed,
  Calibration2,
  ExampleCalibration,
  /** Add your Experiments below **/
  TestCalibration,
];

export default fasowConfig;
