import Environment from '../../abm/Environment';
import MetaEnvironmentConfig from '../../config/metaconfig/MetaEnvironmentConfig';

export default class EnvironmentFacebook extends Environment {
  step(): void {
    this.seeds.forEach((agent) => {
      agent.step();
    });
  }

  createEnvironment(environmentConfig: MetaEnvironmentConfig): Environment {
    return new EnvironmentFacebook().setConfig(environmentConfig);
  }
}
