import Environment from "../../abm/Environment";
import MetaEnvironmentConfig from "../../config/metaconfig/MetaEnvironmentConfig";
import RowData from "../../datahandler/data/RowData";

export default class EnvironmentFacebook extends Environment {
  // eslint-disable-next-line class-methods-use-this
  getCountStates(): RowData {
    return new RowData();
  }

  run(): void {
    while (this.currentPeriod < this.periods) {
      this.step();
    }
  }

  step(): void {
    this.seeds.forEach((agent) => {
      agent.step();
    });
  }

  createEnvironment(environmentConfig: MetaEnvironmentConfig): Environment {
    return new EnvironmentFacebook().setConfig(environmentConfig);
  }
}
