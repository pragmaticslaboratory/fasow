import type Experiment from "../../abm/Experiment";
import MetaEnvironmentConfig from "./MetaEnvironmentConfig";

export default interface MetaExperimentConfig {
  // Experiment Metadata
  readonly id: number;
  name: string;
  description: string;
  type: typeof Experiment;
  maxRepetitions: number;
  // Scenario Metadata
  environmentConfig: MetaEnvironmentConfig;
}
