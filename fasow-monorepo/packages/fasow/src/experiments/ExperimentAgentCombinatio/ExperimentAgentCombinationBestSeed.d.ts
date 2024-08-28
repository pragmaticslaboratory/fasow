import Experiment from "../../fasow/abm/Experiment";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
export default class ExperimentAgentCombinationBestSeed extends Experiment {
    seedType: string;
    seedFollowerPercentage: number;
    nonSeedPercentage: number;
    seedPercentage: number;
    static getActionsConfig(type: string): MetaActionConfig[];
    Strategy(): void;
    createExperiment(): Experiment;
}
