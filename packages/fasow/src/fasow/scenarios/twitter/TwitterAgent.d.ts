import Agent from "../../abm/Agent";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
export default class TwitterAgent extends Agent {
    static NOT_READ: number;
    static READ: number;
    static READY: number;
    static SHARED: number;
    step(): void;
    createAgent(id: number, agentData: MetaAgentConfig): Agent;
    update(message: any): any;
}
