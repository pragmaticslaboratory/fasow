import Agent from "../../fasow/abm/Agent";
import MetaAgentConfig from "../../fasow/config/metaconfig/MetaAgentConfig";
import TwitterAgent from "../../fasow/scenarios/twitter/TwitterAgent";
export default class EffectAgent extends TwitterAgent {
    isSaturated: boolean;
    static saturationThreshold: number;
    times_read_counter: number;
    step(): void;
    createAgent(id: number, agentData: MetaAgentConfig): Agent;
}
