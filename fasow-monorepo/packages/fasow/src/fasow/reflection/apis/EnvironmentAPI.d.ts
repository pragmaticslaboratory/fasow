import type Environment from "../../abm/Environment";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
import MetaEnvironmentConfig from "../../config/metaconfig/MetaEnvironmentConfig";
export default class EnvironmentAPI {
    private scenarioConfig;
    private environmentFactories;
    constructor();
    registerNewEnvironment(newEnvironmentType: typeof Environment): void;
    private getEnvironment;
    generateEnvironment(config: MetaEnvironmentConfig): Environment;
    setNetworkToScenario(environment: typeof Environment): void;
    addAgentToScenario(agentConfig: MetaAgentConfig): void;
    setNetworkSizeToScenario(size: number): void;
    setPeriodsToScenario(max: number): void;
    setScenarioConfig(scenarioConfig: MetaEnvironmentConfig): void;
    getScenarioConfig(): MetaEnvironmentConfig;
    resetScenarioConfig(): MetaEnvironmentConfig;
    getState(): any;
}
