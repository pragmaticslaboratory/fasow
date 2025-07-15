import type Calibration from '../../abm/Calibration';
import MetaEnvironmentConfig from './MetaEnvironmentConfig';

export default interface MetaCalibrationConfig {
  // Calibration Metadata
  readonly id: number;
  name: string;
  description: string;
  type: typeof Calibration;
  maxRepetitions: number;
  // Scenario Metadata
  environmentConfig: MetaEnvironmentConfig;
}
