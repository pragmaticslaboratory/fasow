import Simulation from '../../abm/Simulation';

export default interface CalibrationConfig {
  name: string;
  description: string;
  simulation: Simulation;
}
