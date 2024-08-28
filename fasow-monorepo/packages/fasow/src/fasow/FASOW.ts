import ExampleExperiment from "../experiments/ExampleExperiment";
import Experiment from "./abm/Experiment";
import ActionRead from "./abm/wom/custom-actions/ActionRead";
import ActionShare from "./abm/wom/custom-actions/ActionShare";
import MetaExperimentConfig from "./config/metaconfig/MetaExperimentConfig";
import IDataHandler from "./datahandler/IDataHandler";
import ITowerHandler from "./reflection/tower/ITowerHandler";
import FacebookAgent from "./scenarios/facebook/FacebookAgent";
import EnvironmentTwitter from "./scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "./scenarios/twitter/TwitterAgent";
import ITimeKeeper from "./timekeeper/ITimeKeeper";

/*
todo : maybe the loads actions,agents,environments, agents, could be better
  creating 4 classes with one method that allow to call towerHandler and register all of them´s.
 */

export default class FASOW {
  private dataHandler: IDataHandler = new IDataHandler();
  private towerHandler: ITowerHandler = new ITowerHandler();
  private timeKeeper: ITimeKeeper = new ITimeKeeper();

  private experiment: Experiment | undefined = undefined;
  constructor() {
    this.loadActions();
    this.loadAgents();
    this.loadEnvironments();
    this.loadExperiments();
  }

  loadActions(): void {
    console.log("Loading Actions...");
    this.towerHandler.registerNewAction(ActionRead);
    this.towerHandler.registerNewAction(ActionShare);
  }

  loadAgents(): void {
    console.log("Loading Agents...");
    this.towerHandler.registerNewAgent(TwitterAgent);
    this.towerHandler.registerNewAgent(FacebookAgent);
  }

  loadEnvironments(): void {
    console.log("Loading Environments...");
    this.towerHandler.registerNewEnvironment(EnvironmentTwitter);
    // TowerHandler.registerNewEnvironment(EnvironmentFacebook);
  }

  loadExperiments(): void {
    console.log("Loading Experiments...");
    this.towerHandler.registerNewExperiment(ExampleExperiment);
  }

  getDataHandler(): IDataHandler {
    return this.dataHandler;
  }

  getTowerHandler(): ITowerHandler {
    return this.towerHandler;
  }

  getTimeKeeper(): ITimeKeeper {
    return this.timeKeeper;
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
   *     experiments:[
   *         {propertyKey: string, propertyType: boolean|string|number}
   *     ],
   *     agent_states:[
   *         {propertyKey: string, column_name: string, value: number}
   *     ]
   * }
   */
  getState(): any {
    return this.dataHandler.getState();
  }

  runExperiment(experiment: typeof Experiment) {
    this.towerHandler.selectExperiment(experiment);
    // console.log("Selected Experiment: ", experiment.name);
    this.privateRunExperiment();
  }

  /**
   * Runs an experiment by his name, this process is
   * 1.- select the experiment by his name
   * 2.- run selected experiment.
   *
   * Remember check if the experiment are registered in fasow or only use
   * strings given by fasow.getState().
   * @param experiment
   */
  runExperimentByName(experiment: string) {
    this.towerHandler.selectExperimentByName(experiment);
    // console.log("Selected Experiment: ", experiment);
    this.privateRunExperiment();
  }

  /**
   * Select experiment by his "class" or "type".
   * This method is usually used for debugging the backend.
   * @param experiment : Experiment : Some typeof Experiment.
   */
  selectExperiment(experiment: typeof Experiment) {
    this.towerHandler.selectExperiment(experiment);
  }

  /**
   * Select some experiment by the name.
   * Before selecting some experiment by his name, check if the experiment
   * is registered in fasow. Other way without errors is, only select
   * experiments by name given by fasow.getState().
   * @param experiment
   */
  async selectExperimentByName(experiment: string) {
    this.towerHandler.selectExperimentByName(experiment);
    this.experiment = await this.initializeSelectedExperiment();
  }

  /**
   * Runs the selected experiment, if not exists any selected experiment
   * the execution would can be stopped for Null or Undefined reference.
   */
  runSelectedExperiment() {

    this.privateRunExperiment();
    // todo : check if any exception is thrown when running run with no experiment selected
  }

  private privateRunExperiment() {
    // todo : method to search in experiments array and set the strategy
    // todo : move this method to other class like FASOW ?
    // todo : maybe we need to move too the method select experiment or maybe allow to call that method from other class like fasow also
    // todo handle with a trycatch if the experiments is undefined
    this.dataHandler.experiment = this.experiment;
    // exp.executeStrategy();
    // @ts-ignore
    this.experiment.run();
    this.dataHandler.writeCSVFile();
  }

  /**
   * Registers a new Experiment, that can be executed after.
   * @param experiment :  Experiment : The class of the experiment to be registered
   */
  registerNewExperiment(experiment: typeof Experiment) {
    this.towerHandler.registerNewExperiment(experiment);
  }

  /**
   * Calls to fasow to write a csv file.
   */
  writeFASOWState() {
    // todo : frontend dont have filesystem think a better way to return a JSON with the data
    this.dataHandler.writeFASOWState();
  }

  /**
   * Returns the output generated by the simulation
   */
  getOutput(): any[] {
    return this.dataHandler.getOutput();
  }

  /**
   * Clears the output generated by the datahandler and then returns that
   */
  clearDataHandlerOutput(): any[] {
    return this.clearDataHandlerOutput();
  }

  /**
   * Return the last iteration state of the simulation
   */
  getLastOutputRow(): any[] {
    return this.dataHandler.getLastOutputRow();
  }

  initializeSelectedExperiment(): Experiment {
    this.experiment = this.towerHandler.createSelectedExperiment();
    this.experiment.executeStrategy();
    this.experiment.initialize();
    return this.experiment;
  }

  getExperimentConfig(): MetaExperimentConfig {
    return this.towerHandler.getExperimentConfig();
  }
}
