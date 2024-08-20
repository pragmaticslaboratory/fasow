import type Environment from "../../abm/Environment";
import MetaAgentConfig from "./MetaAgentConfig";
export default interface MetaEnvironmentConfig {
    networkSize: number;
    maxTick: number;
    environmentType: typeof Environment;
    metaAgentsConfigs: MetaAgentConfig[];
}
