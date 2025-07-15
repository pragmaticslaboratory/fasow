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
import CalibrationAPI from '../apis/CalibrationAPI';

export default class ITowerHandler {
  private ActionAPI: ActionAPI = new ActionAPI();
  private AgentAPI: AgentAPI = new AgentAPI();
  private EnvironmentAPI: EnvironmentAPI = new EnvironmentAPI();
  private CalibrationAPI: CalibrationAPI = new CalibrationAPI();

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
    this.CalibrationAPI.setCalibrationName(name);
  }

  setCalibrationMaxRepetitions(maxRepetitions: number) {
    this.CalibrationAPI.setCalibrationMaxRepetitions(maxRepetitions);
  }

  setCalibrationDescription(description: string) {
    this.CalibrationAPI.setCalibrationDescription(description);
  }

  registerNewCalibration(calibration: typeof Calibration) {
    this.CalibrationAPI.registerNewCalibration(calibration);
  }

  selectCalibration(select: typeof Calibration) {
    this.CalibrationAPI.selectCalibration(select);
  }

  getCalibrationConfig(): MetaCalibrationConfig {
    return this.CalibrationAPI.getCalibrationConfig();
  }

  /*
  createCalibration(type: typeof Calibration): CalibrationAPI {
    return this.CalibrationAPI.createCalibration(type);
  } */

  createSelectedCalibration(): Calibration {
    return this.CalibrationAPI.createSelectedCalibration();
  }

  selectCalibrationByName(calibration: string) {
    this.CalibrationAPI.selectCalibrationByName(calibration);
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
    return this.CalibrationAPI.getState();
  }

  getSelectedCalibration(): typeof Calibration {
    return this.CalibrationAPI.getSelectedCalibration();
  }

  getSelectedCalibrationTypeName(): string {
    return this.CalibrationAPI.getSelectedCalibration().name;
  }
}

// const TowerHandler: ITowerHandler = new ITowerHandler();

// export default TowerHandler;
