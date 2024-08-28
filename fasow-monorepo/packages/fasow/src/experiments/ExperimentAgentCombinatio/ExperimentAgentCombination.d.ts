import Experiment from "../../fasow/abm/Experiment";
import MetaAgentConfig from "../../fasow/config/metaconfig/MetaAgentConfig";
export default class ExperimentAgentCombination extends Experiment {
    percentageAvr: number;
    finalPercentageHub: number;
    finalPercentageLeader: number;
    percentageTypes: string;
    static getMetaConfig(name: string, percentage: number, seed: boolean, state: number): MetaAgentConfig;
    run(): void;
    Strategy(): void;
    createExperiment(): Experiment;
}
