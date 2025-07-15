import FASOW from '../FASOW';
import CalibrationConfig from '../config/config/CalibrationConfig';
import MetaCalibrationConfig from '../config/metaconfig/MetaCalibrationConfig';
import Simulation from './Simulation';
import ICalibrationCreator from './interfaces/Experiment/ICalibrationCreator';
import ICalibrationStrategy from './interfaces/Experiment/ICalibrationStrategy';
import Repetitions from '../timekeeper/Repetitions';

/**
 * The Calibration abstract class allow to the user to Implement and Configure an Calibration overriding the Strategy Method
 */
export default abstract class Calibration
  implements
    CalibrationConfig,
    ICalibrationCreator,
    ICalibrationStrategy,
    Repetitions
{
  name: string;
  description: string;
  simulation: Simulation;

  constructor() {
    this.name = '';
    this.description = '';
    this.simulation = new Simulation();

    this.repetition = -1;
    this.maxRepetition = -1;
  }

  /**
   * Run the Calibration,initializing the model and starting the simulation
   * */
  run() {
    this.setRepetition(0);
    this.initialize();
    console.log(
      'Ended Initialization --> On Calibration.run(), currentRepetition  is: ',
      this.getRepetition() + 1,
      ' of (',
      this.getMaxRepetition(),
      ')',
    );
    while (this.canNextRepetition()) {
      if (!this.simulation.isDone()) {
        break;
      }
      console.log('Starting Simulation...');
      this.simulation.run();
      console.log('Ending Simulation...');
      this.nextRepetition();
      if (this.canNextRepetition()) {
        this.initialize();
        console.log(
          'Ended Initialization --> On Calibration.run(), currentRepetition  is: ',
          this.getRepetition() + 1,
          ' of (',
          this.getMaxRepetition(),
          ')',
        );
      }
    }
    console.log('Ending Calibration...');
  }

  /**
   * Initialize the Model, setting up the configs to TowerHandler
   */
  initialize() {
    console.log('Starting initialization...');
    if (this.canNextRepetition()) {
      this.loadConfig();
      this.simulation.initialize(this.getRepetition());
    }
  }

  abstract createCalibration(): Calibration;

  /**
   * Setting up the CalibrationConfig, creating the simulation
   * @param config : MetaCalibrationConfig :
   */
  setConfig(config: MetaCalibrationConfig): void {
    this.name = config.name;
    this.description = config.description;
    this.simulation = new Simulation();
    this.setMaxRepetition(config.maxRepetitions);
  }

  /**
   * Load the configuration, delivered by the TowerHandler
   */
  loadConfig(): void {
    const config: MetaCalibrationConfig =
      FASOW.TowerHandler.getCalibrationConfig();
    this.setConfig(config);
  }

  /**
   * The Strategy allow to the user to setting up configuration of Calibration doing calls to the TowerHandler
   * @constructor
   */
  abstract Strategy(): void;

  /**
   * Calls to Strategy to be executed
   */
  executeStrategy(): void {
    console.log('Executing Strategy');
    this.Strategy();
  }

  maxRepetition: number;
  repetition: number;

  /**
   * Allows to set the repetition of the Calibration, this will hardly be called
   * @param repetition : number : The number that indicate the actual repetition of the calibration
   */
  setRepetition(repetition: number) {
    this.repetition = repetition;
  }

  /**
   * Return the Repetition of the Calibration
   */
  getRepetition(): number {
    return this.repetition;
  }

  /**
   * Updates the repetition number to +1
   */
  nextRepetition(): number {
    this.repetition += 1;
    return this.repetition;
  }

  /**
   * Returns true if is possible to do another repetition
   */
  canNextRepetition(): boolean {
    return this.repetition < this.maxRepetition;
  }

  /**
   * Allows to set the max repetitions
   * @param maxRepetition : number : The quantity of repetitions to execute the Calibration
   */
  setMaxRepetition(maxRepetition: number): void {
    this.maxRepetition = maxRepetition;
  }

  /**
   * Return the max Repetitions to do the Calibration
   */
  getMaxRepetition(): number {
    return this.maxRepetition;
  }

  resetRepetitions() {
    this.repetition = -1;
  }
}
