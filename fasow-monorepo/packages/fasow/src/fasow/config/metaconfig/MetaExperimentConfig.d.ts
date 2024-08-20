import type Experiment from "../../abm/Experiment";
import MetaEnvironmentConfig from "./MetaEnvironmentConfig";
export default interface MetaExperimentConfig {
    readonly id: number;
    name: string;
    description: string;
    type: typeof Experiment;
    maxRepetitions: number;
    environmentConfig: MetaEnvironmentConfig;
}
