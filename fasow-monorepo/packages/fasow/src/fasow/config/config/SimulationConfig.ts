import type Environment from "../../abm/Environment";

export default interface SimulationConfig {
  readonly id: number;
  environment: Environment | any;
}
