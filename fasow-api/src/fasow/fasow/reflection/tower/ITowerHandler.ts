import Action from '../../abm/Action';
import Agent from '../../abm/Agent';
import Environment from '../../abm/Environment';
import Calibration from '../../abm/Calibration';
import MetaActionConfig from '../../config/metaconfig/MetaActionConfig';
import MetaAgentConfig from '../../config/metaconfig/MetaAgentConfig';
import MetaEnvironmentConfig from '../../config/metaconfig/MetaEnvironmentConfig';
import MetaCalibrationConfig from '../../config/metaconfig/MetaCalibrationConfig';
import ActionAPI from '../apis/ActionAPI';
import AgentAPI from '../apis/AgentAPI';
import EnvironmentAPI from '../apis/EnvironmentAPI';
import ExperimentAPI from '../apis/ExperimentAPI';

export default class ITowerHandler {
  private ActionAPI: ActionAPI = new ActionAPI();
  private AgentAPI: AgentAPI = new AgentAPI();
  private EnvironmentAPI: EnvironmentAPI = new EnvironmentAPI();
  private ExperimentAPI: ExperimentAPI = new ExperimentAPI();

  /* Action API */

  registerNewAction(newActionType: typeof Action) {
    this.ActionAPI.registerNewAction(newActionType);
  }

  generateActions(actionsConfigs: MetaActionConfig[]) {
    return this.ActionAPI.generateActions(actionsConfigs);
  }

  registerMetaActionConfig(actionConfig: MetaActionConfig) {
    this.ActionAPI.registerMetaActionConfig(actionConfig);
  }

  generateActionList(): Action[] {
    return this.ActionAPI.generateActionList();
  }

  getMetaConfigs(): MetaActionConfig[] {
    return this.ActionAPI.getMetaConfigs();
  }

  /* Action API */

  /* Agent API */

  registerMetaConfigs(metaAgentsConfigs: MetaAgentConfig[]) {
    this.AgentAPI.registerMetaConfigs(metaAgentsConfigs);
  }

  registerNewMetaAgentConfig(agentConfig: MetaAgentConfig) {
    this.AgentAPI.registerNewMetaAgentConfig(agentConfig);
  }

  generateAgentsByConfigs(metaConfigs: MetaAgentConfig[]): Agent[] {
    return this.AgentAPI.generateAgentsByConfigs(metaConfigs);
  }

  generateAgentList(): Agent[] {
    return this.AgentAPI.generateAgentList();
  }

  getMetaAgentConfigById(indexMetaAgentConfig: number): MetaAgentConfig {
    return this.AgentAPI.getMetaAgentConfigById(indexMetaAgentConfig);
  }

  registerNewAgent(newAgentType: typeof Agent) {
    this.AgentAPI.registerNewAgent(newAgentType);
  }

  registerMetaAgentsConfigs(metaAgentsConfigs: MetaAgentConfig[]) {
    this.AgentAPI.registerMetaConfigs(metaAgentsConfigs);
  }

  /* Agent API */

  /* Scenario API */
  generateEnvironment(config: MetaEnvironmentConfig) {
    return this.EnvironmentAPI.generateEnvironment(config);
  }

  getScenarioConfig(): MetaEnvironmentConfig {
    return this.EnvironmentAPI.getScenarioConfig();
  }

  registerNewEnvironment(newEnvironmentType: typeof Environment) {
    this.EnvironmentAPI.registerNewEnvironment(newEnvironmentType);
  }

  setNetworkToScenario(environment: typeof Environment) {
    this.EnvironmentAPI.setNetworkToScenario(environment);
  }

  addAgentToScenario(agentConfig: MetaAgentConfig) {
    this.EnvironmentAPI.addAgentToScenario(agentConfig);
  }

  setNetworkSizeToScenario(size: number) {
    this.EnvironmentAPI.setNetworkSizeToScenario(size);
  }

  setPeriodsToScenario(max: number) {
    this.EnvironmentAPI.setPeriodsToScenario(max);
  }

  setScenarioConfig(scenarioConfig: MetaEnvironmentConfig) {
    this.EnvironmentAPI.setScenarioConfig(scenarioConfig);
  }

  resetScenarioConfig(): MetaEnvironmentConfig {
    return this.EnvironmentAPI.resetScenarioConfig();
  }

  /* Scenario API */

  /* Experiment API */

  setCalibrationName(name: string) {
    this.ExperimentAPI.setCalibrationName(name);
  }

  setCalibrationMaxRepetitions(maxRepetitions: number) {
    this.ExperimentAPI.setCalibrationMaxRepetitions(maxRepetitions);
  }

  setCalibrationDescription(description: string) {
    this.ExperimentAPI.setCalibrationDescription(description);
  }

  registerNewCalibration(calibration: typeof Calibration) {
    this.ExperimentAPI.registerNewCalibration(calibration);
  }

  selectCalibration(select: typeof Calibration) {
    this.ExperimentAPI.selectCalibration(select);
  }

  getCalibrationConfig(): MetaCalibrationConfig {
    return this.ExperimentAPI.getCalibrationConfig();
  }

  /*
  createExperiment(type: typeof Experiment): Experiment {
    return this.ExperimentAPI.createExperiment(type);
  } */

  createSelectedCalibration(): Calibration {
    return this.ExperimentAPI.createSelectedCalibration();
  }

  selectCalibrationByName(calibration: string) {
    this.ExperimentAPI.selectCalibrationByName(calibration);
  }

  /* Calibration API */

  /* FASOW STATE FUNCTIONS */
  getActionAPIState(): any {
    return this.ActionAPI.getState();
  }

  getAgentAPIState(): any {
    return this.AgentAPI.getState();
  }

  getEnvironmentAPIState(): any {
    return this.EnvironmentAPI.getState();
  }

  getCalibrationAPIState(): any {
    return this.ExperimentAPI.getState();
  }

  getSelectedCalibration(): typeof Calibration {
    return this.ExperimentAPI.getSelectedCalibration();
  }

  getSelectedCalibrationTypeName(): string {
    return this.ExperimentAPI.getSelectedCalibration().name;
  }
}

// const TowerHandler: ITowerHandler = new ITowerHandler();

// export default TowerHandler;
