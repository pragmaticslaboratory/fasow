import Environment from "../../abm/Environment";
import MetaEnvironmentConfig from "../../config/metaconfig/MetaEnvironmentConfig";

export default class EnvironmentTwitter extends Environment {

  step(): void {
    this.agents.forEach((agent) => {
      agent.step();
    });
  }

  createEnvironment(scenarioConfig: MetaEnvironmentConfig): Environment {
    return new EnvironmentTwitter().setConfig(scenarioConfig);
  }
}
