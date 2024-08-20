import MetaEnvironmentConfig from "../../../config/metaconfig/MetaEnvironmentConfig";
import type Environment from "../../Environment";

/**
 * Factory Method pattern, allow to users to configure and personalize the creation of the Environment
 */
export default interface IEnvironmentCreator {
  /**
   * Factory Method, allow to users to configure and personalize the creation of the environment
   * @param environmentConfig : MetaEnvironmentConfig : The configuration of the scenario
   */
  createEnvironment(environmentConfig: MetaEnvironmentConfig): Environment;
}
