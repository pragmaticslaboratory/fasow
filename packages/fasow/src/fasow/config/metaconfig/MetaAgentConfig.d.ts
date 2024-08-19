import type Agent from "../../abm/Agent";
import { AgentState } from "../../abm/interfaces/Agent/AgentState";
import MetaActionConfig from "./MetaActionConfig";
export default interface MetaAgentConfig {
    readonly id: number;
    name: string;
    percentage: number;
    followersPercentage: number;
    actionsConfigs: MetaActionConfig[];
    type: typeof Agent;
    state?: AgentState;
    isSeed: boolean;
}
