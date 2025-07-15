import Calibration from '../../Calibration';

/**
 * Factory method pattern, allow to users to configure and personalize the creation of the experiment
 */
export default interface IExperimentCreator {
  /**
   * Factory Method, allow to users to configure and personalize the creation of the experiment
   */
  createExperiment(): Calibration;
}
