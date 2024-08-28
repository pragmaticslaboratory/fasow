import Experiment from "../../Experiment";

/**
 * Factory method pattern, allow to users to configure and personalize the creation of the experiment
 */
export default interface IExperimentCreator {
  /**
   * Factory Method, allow to users to configure and personalize the creation of the experiment
   */
  createExperiment(): Experiment;
}
