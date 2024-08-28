import ExperimentConfig from "../config/config/ExperimentConfig";
import MetaExperimentConfig from "../config/metaconfig/MetaExperimentConfig";
import Simulation from "./Simulation";
import IExperimentCreator from "./interfaces/Experiment/IExperimentCreator";
import IExperimentStrategy from "./interfaces/Experiment/IExperimentStrategy";
/**
 * The Experiment abstract class allow to the user to Implement and Configure an Experiment overriding the Strategy Method
 */
export default abstract class Experiment implements ExperimentConfig, IExperimentCreator, IExperimentStrategy {
    name: string;
    description: string;
    simulation: Simulation;
    constructor();
    /**
     * Run the Experiment,initializing the model and starting the simulation
     * */
    run(): void;
    /**
     * Initialize the Model, setting up the configs to TowerHandler
     */
    initialize(): void;
    abstract createExperiment(): Experiment;
    /**
     * Setting up the ExperimentConfig, creating the simulation
     * @param config : MetaExperimentConfig :
     */
    setConfig(config: MetaExperimentConfig): void;
    /**
     * Load the configuration, delivered by the TowerHandler
     */
    loadConfig(): void;
    /**
     * The Strategy allow to the user to setting up configuration of Experiment doing calls to the TowerHandler
     * @constructor
     */
    abstract Strategy(): void;
    /**
     * Calls to Strategy to be executed
     */
    executeStrategy(): void;
}
