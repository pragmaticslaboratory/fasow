import { TowerHandler } from "../../main";
import type SimulationConfig from "../config/config/SimulationConfig";
import Environment from "./Environment";

/**
 * The Simulation class handle the initialization of the Environment and start it
 */
export default class Simulation implements SimulationConfig {
  id;
  environment: Environment | any;
  constructor() {
    this.id = -1;
  }

  /**
   * Starts the simulation to being executed period per period
   */
  run(): void {
    this.environment.run();
  }

  /**
   * Initializes the simulation creating an environment and configuring it
   * @param id : number : Correspond to the repetition of the simulation was executed
   */
  initialize(id: number) {
    this.id = id;
    this.environment = TowerHandler.generateEnvironment(
      TowerHandler.getScenarioConfig()
    );
    this.environment.initialize();
  }

  /**
   * Checks if the Environment is Ready to be executed or not
   */
  isDone(): boolean {
    return this.environment.isDone();
  }
}
