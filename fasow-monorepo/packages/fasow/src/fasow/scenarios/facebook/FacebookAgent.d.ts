import Agent from "../../abm/Agent";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
export default class FacebookAgent extends Agent {
    update(message: any): void;
    step(): void;
    createAgent(id: number, agentData: MetaAgentConfig): Agent;
}
