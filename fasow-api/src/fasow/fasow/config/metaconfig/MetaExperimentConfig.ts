import type Calibration from '../../abm/Calibration';
import MetaEnvironmentConfig from './MetaEnvironmentConfig';

export default interface MetaExperimentConfig {
  // Experiment Metadata
  readonly id: number;
  name: string;
  description: string;
  type: typeof Calibration;
  maxRepetitions: number;
  // Scenario Metadata
  environmentConfig: MetaEnvironmentConfig;
}
