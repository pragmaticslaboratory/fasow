import Environment from '../../fasow/fasow/abm/Environment';
import MetaEnvironmentConfig from '../../fasow/fasow/config/metaconfig/MetaEnvironmentConfig';
import EnvironmentTwitter from '../../fasow/fasow/scenarios/twitter/EnvironmentTwitter';

export default class EffectTwitter extends EnvironmentTwitter {
  public postOfCompanies: number = 4;
  public periodsToShare: number[] = [];

  run() {
    this.calculatePeriodsToRepost();
    console.log('PostOfCompanies: ', this.postOfCompanies);
    console.log('Periods to Repost: ', this.periodsToShare);
    super.run();
  }

  private calculatePeriodsToRepost() {
    for (let i = 0; i < this.postOfCompanies; i += 1) {
      const periodToShare: number = Math.round(
        Math.random() * (this.getMaxTick() - 1),
      );
      this.periodsToShare.push(periodToShare);
    }
  }

  private isAPeriodToReShare(): boolean {
    const period = this.getTick();
    let auxBool: boolean = false;
    this.periodsToShare.forEach((p) => {
      if (period === p) {
        auxBool = true;
      }
    });
    return auxBool;
  }

  step() {
    if (this.getTick() > 0 && this.isAPeriodToReShare()) {
      console.log('ReSending');
      this.resetSeedStates();
    }
    super.step();
  }

  createEnvironment(environmentConfig: MetaEnvironmentConfig): Environment {
    return new EffectTwitter().setConfig(environmentConfig);
  }
}
