import Environment from "../../fasow/abm/Environment";
import MetaEnvironmentConfig from "../../fasow/config/metaconfig/MetaEnvironmentConfig";
import EnvironmentTwitter from "../../fasow/scenarios/twitter/EnvironmentTwitter";
export default class EffectTwitter extends EnvironmentTwitter {
    postOfCompanies: number;
    periodsToShare: number[];
    run(): void;
    private calculatePeriodsToRepost;
    private isAPeriodToReShare;
    step(): void;
    createEnvironment(environmentConfig: MetaEnvironmentConfig): Environment;
}
