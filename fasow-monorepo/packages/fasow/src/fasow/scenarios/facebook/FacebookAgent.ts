import Agent from "../../abm/Agent";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";

export default class FacebookAgent extends Agent {
  update(message: any) {
    throw new Error("Method not implemented.");
  }
  step(): void {
    this.receiveMessage();
  }

  // eslint-disable-next-line class-methods-use-this
  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    // @ts-ignore
    return new FacebookAgent(id, agentData);
  }
}
