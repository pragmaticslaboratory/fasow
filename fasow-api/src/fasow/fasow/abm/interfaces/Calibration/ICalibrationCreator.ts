import Calibration from '../../Calibration';

/**
 * Factory method pattern, allow to users to configure and personalize the creation of the calibration
 */
export default interface ICalibrationCreator {
  /**
   * Factory Method, allow to users to configure and personalize the creation of the calibration
   */
  createCalibration(): Calibration;
}
