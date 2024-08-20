import type Agent from "../../abm/Agent";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
export default class AgentAPI {
    private agentsFactories;
    private agentConfigs;
    constructor();
    registerNewAgent(type: typeof Agent): void;
    registerNewMetaAgentConfig(agentConfig: MetaAgentConfig): void;
    registerMetaConfigs(agentConfigs: MetaAgentConfig[]): void;
    private getAgent;
    generateAgentList(): Agent[];
    generateAgentsByConfigs(metaConfigs: MetaAgentConfig[]): Agent[];
    getMetaAgentConfigById(id: number): MetaAgentConfig;
    getState(): any;
}
