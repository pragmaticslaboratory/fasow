import Simulation from "../../abm/Simulation";

export default interface ExperimentConfig {
  name: string;
  description: string;
  simulation: Simulation;
}
