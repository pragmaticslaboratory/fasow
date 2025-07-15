import ExampleExperiment from '../.././calibrations/ExampleExperiment';
import Calibration from './abm/Calibration';
import ActionRead from './abm/wom/custom-actions/ActionRead';
import ActionShare from './abm/wom/custom-actions/ActionShare';
import MetaCalibrationConfig from './config/metaconfig/MetaCalibrationConfig';
import IDataHandler from './datahandler/IDataHandler';
import ITowerHandler from './reflection/tower/ITowerHandler';
import FacebookAgent from './scenarios/facebook/FacebookAgent';
import EnvironmentTwitter from './scenarios/twitter/EnvironmentTwitter';
import TwitterAgent from './scenarios/twitter/TwitterAgent';
// import ITimeKeeper from './timekeeper/ITimeKeeper';
import fasowConfig from 'src/fasowLoader';

/*
todo : maybe the loads actions,agents,environments, agents, could be better
  creating 4 classes with one method that allow to call towerHandler and register all of them´s.
 */

export default class FASOW {
  public static DataHandler: IDataHandler = new IDataHandler();
  public static TowerHandler: ITowerHandler = new ITowerHandler();
  // public static TimeKeeper: ITimeKeeper = new ITimeKeeper();

  public static calibration: Calibration | undefined = undefined;
  constructor() {
    this.loadActions();
    this.loadAgents();
    this.loadEnvironments();
    this.loadCalibrations();

    fasowConfig.forEach((exp) => {
      FASOW.TowerHandler.registerNewCalibration(exp);
    });
    console.log('FASOW Config Loaded. ', fasowConfig);

    FASOW.TowerHandler.selectCalibrationByName('ExampleExperiment');
    this.initializeSelectedExperiment();
  }

  loadActions(): void {
    console.log('Loading Actions...');
    FASOW.TowerHandler.registerNewAction(ActionRead);
    FASOW.TowerHandler.registerNewAction(ActionShare);
  }

  loadAgents(): void {
    console.log('Loading Agents...');
    FASOW.TowerHandler.registerNewAgent(TwitterAgent);
    FASOW.TowerHandler.registerNewAgent(FacebookAgent);
  }

  loadEnvironments(): void {
    console.log('Loading Environments...');
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter);
    // TowerHandler.registerNewEnvironment(EnvironmentFacebook);
  }

  loadCalibrations(): void {
    console.log('Loading Calibrations...');
    FASOW.TowerHandler.registerNewCalibration(ExampleExperiment);
  }

  getDataHandler(): IDataHandler {
    return FASOW.DataHandler;
  }

  getTowerHandler(): ITowerHandler {
    return FASOW.TowerHandler;
  }

  /**
   * Returns a "snapshot" of fasow.
   * The format given is the following:
   *
   * state: {
   *     actions:[
   *         {propertyKey: string, propertyType: boolean|string|number}
   *     ],
   *     agents:[
   *         {propertyKey: string, propertyType: boolean|string|number}
   *     ],
   *     environments:[
   *         {propertyKey: string, propertyType: boolean|string|number}
   *     ],
   *     calibrations:[
   *         {propertyKey: string, propertyType: boolean|string|number}
   *     ],
   *     agent_states:[
   *         {propertyKey: string, column_name: string, value: number}
   *     ]
   * }
   */
  getState(): any {
    return FASOW.DataHandler.getState();
  }

  runExperiment(calibration: typeof Calibration) {
    FASOW.TowerHandler.selectCalibration(calibration);
    // console.log("Selected Calibration: ", calibration.name);
    this.privateRunCalibration();
  }

  /**
   * Runs an calibration by his name, this process is
   * 1.- select the calibration by his name
   * 2.- run selected calibration.
   *
   * Remember check if the calibration are registered in fasow or only use
   * strings given by fasow.getState().
   * @param calibration
   */
  runExperimentByName(calibration: string) {
    FASOW.TowerHandler.selectCalibrationByName(calibration);
    // console.log("Selected Experiment: ", calibration);
    this.privateRunCalibration();
  }

  /**
   * Select calibration by his "class" or "type".
   * This method is usually used for debugging the backend.
   * @param calibration : Calibration : Some typeof Experiment.
   */
  selectExperiment(calibration: typeof Calibration) {
    FASOW.TowerHandler.selectCalibration(calibration);
  }

  /**
   * Select some calibration by the name.
   * Before selecting some calibration by his name, check if the calibration
   * is registered in fasow. Other way without errors is, only select
   * experiments by name given by fasow.getState().
   * @param calibration
   */
  selectExperimentByName(calibration: string) {
    FASOW.TowerHandler.selectCalibrationByName(calibration);
    FASOW.calibration = this.initializeSelectedExperiment();
    return FASOW.TowerHandler.getCalibrationConfig();
  }

  /**
   * Runs the selected calibration, if not exists any selected calibration
   * the execution would can be stopped for Null or Undefined reference.
   */
  runSelectedCalibration() {
    this.privateRunCalibration();
    // Update 26/08/2024 : Change the error handling and, instead of throw an exception, would be better return the output?
    // todo : check if any exception is thrown on a execution without calibration
  }

  private privateRunCalibration() {
    // todo : method to search in experiments array and set the strategy
    // todo : move this method to other class like FASOW ?
    // todo : maybe we need to move too the method select calibration or maybe allow to call that method from other class like fasow also
    // todo handle with a try catch if the experiments is undefined
    // FASOW.DataHandler.calibration = FASOW.calibration;
    // exp.executeStrategy();
    FASOW.calibration.run();
    FASOW.DataHandler.writeCSVFile();
  }

  /**
   * Registers a new Experiment, that can be executed after.
   * @param calibration :  Calibration : The class of the calibration to be registered
   */
  registerNewExperiment(calibration: typeof Calibration) {
    FASOW.TowerHandler.registerNewCalibration(calibration);
  }

  /**
   * Calls to fasow to write a csv file.
   */
  writeFASOWState() {
    // todo : frontend dont have filesystem think a better way to return a JSON with the data
    FASOW.DataHandler.writeFASOWState();
  }

  /**
   * Returns the output generated by the simulation
   */
  getOutput(): any[] {
    return FASOW.DataHandler.getOutput();
  }

  /**
   * Clears the output generated by the datahandler and then returns that
   */
  clearDataHandlerOutput(): any[] {
    return FASOW.DataHandler.clearOutput();
  }

  /**
   * Return the last iteration state of the simulation
   */
  getLastOutputRow(): any[] {
    return FASOW.DataHandler.getLastOutputRow();
  }

  initializeSelectedExperiment(): Calibration {
    FASOW.calibration = FASOW.TowerHandler.createSelectedCalibration();
    FASOW.calibration.executeStrategy();
    FASOW.calibration.initialize();
    return FASOW.calibration;
  }

  getExperimentConfig(): MetaCalibrationConfig {
    return FASOW.TowerHandler.getCalibrationConfig();
  }
}
