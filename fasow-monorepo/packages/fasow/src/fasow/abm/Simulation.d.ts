import type SimulationConfig from "../config/config/SimulationConfig";
import Environment from "./Environment";
/**
 * The Simulation class handle the initialization of the Environment and start it
 */
export default class Simulation implements SimulationConfig {
    id: any;
    environment: Environment | any;
    constructor();
    /**
     * Starts the simulation to being executed period per period
     */
    run(): void;
    /**
     * Initializes the simulation creating an environment and configuring it
     * @param id : number : Correspond to the repetition of the simulation was executed
     */
    initialize(id: number): void;
    /**
     * Checks if the Environment is Ready to be executed or not
     */
    isDone(): boolean;
}
