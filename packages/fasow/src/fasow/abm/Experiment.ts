import { TimeKeeper, TowerHandler } from "../../main";
import ExperimentConfig from "../config/config/ExperimentConfig";
import MetaExperimentConfig from "../config/metaconfig/MetaExperimentConfig";
import Simulation from "./Simulation";
import IExperimentCreator from "./interfaces/Experiment/IExperimentCreator";
import IExperimentStrategy from "./interfaces/Experiment/IExperimentStrategy";

/**
 * The Experiment abstract class allow to the user to Implement and Configure an Experiment overriding the Strategy Method
 */
export default abstract class Experiment
  implements ExperimentConfig, IExperimentCreator, IExperimentStrategy
{
  name: string;
  description: string;
  simulation: Simulation;

  constructor() {
    this.name = "";
    this.description = "";
    this.simulation = new Simulation();
  }

  /**
   * Run the Experiment,initializing the model and starting the simulation
   * */
  run() {
    TimeKeeper.setRepetition(0);
    this.initialize();
    console.log(
      "Ended Initialization --> On Experiment.run(), currentRepetition  is: ",
      TimeKeeper.getRepetition()+1,
      " of (",
      TimeKeeper.getMaxRepetition(),
      ")"
    );
    while (TimeKeeper.canNextRepetition()) {
      if (!this.simulation.isDone()) {
        break;
      }
      console.log("Starting Simulation...");
      this.simulation.run();
      console.log("Ending Simulation...");
      TimeKeeper.nextRepetition();
      if(TimeKeeper.canNextRepetition()){
        this.initialize();
        console.log(
            "Ended Initialization --> On Experiment.run(), currentRepetition  is: ",
            TimeKeeper.getRepetition()+1,
            " of (",
            TimeKeeper.getMaxRepetition(),
            ")"
        );
      }
    }
    console.log("Ending Experiment...");
  }

  /**
   * Initialize the Model, setting up the configs to TowerHandler
   */
  initialize() {
    console.log("Starting initialization...")
    if (TimeKeeper.canNextRepetition()) {
      this.loadConfig();
      this.simulation.initialize(TimeKeeper.getRepetition());
    }
  }

  abstract createExperiment(): Experiment;

  /**
   * Setting up the ExperimentConfig, creating the simulation
   * @param config : MetaExperimentConfig :
   */
  setConfig(config: MetaExperimentConfig): void {
    this.name = config.name;
    this.description = config.description;
    this.simulation = new Simulation();
    TimeKeeper.setMaxRepetition(config.maxRepetitions);
  }

  /**
   * Load the configuration, delivered by the TowerHandler
   */
  loadConfig(): void {
    const config: MetaExperimentConfig = TowerHandler.getExperimentConfig();
    this.setConfig(config);
  }

  /**
   * The Strategy allow to the user to setting up configuration of Experiment doing calls to the TowerHandler
   * @constructor
   */
  abstract Strategy(): void;

  /**
   * Calls to Strategy to be executed
   */
  executeStrategy(): void {
    console.log("Executing Strategy");
    this.Strategy();
  }
}
