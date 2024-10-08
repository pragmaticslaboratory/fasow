import Agent from '../../fasow/fasow/abm/Agent';
import MetaAgentConfig from '../../fasow/fasow/config/metaconfig/MetaAgentConfig';
import TwitterAgent from '../../fasow/fasow/scenarios/twitter/TwitterAgent';
import { AgentCountBoolean } from '../../fasow/fasow/datahandler/decorators/DataHandlerDecorators';

export default class EffectAgent extends TwitterAgent {
  @AgentCountBoolean('saturated', false) public isSaturated: boolean = false;
  public static saturationThreshold = 3;
  public times_read_counter = 0;

  step() {
    super.step();
  }

  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    return new EffectAgent().setConfig(id, agentData);
  }
}
