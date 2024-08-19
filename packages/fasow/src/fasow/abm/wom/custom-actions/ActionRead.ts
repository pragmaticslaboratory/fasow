import MetaActionConfig from "../../../config/metaconfig/MetaActionConfig";
import Action from "../../Action";
import Agent from "../../Agent";
import { AgentState } from "../../interfaces/Agent/AgentState";
import TwitterAgent from "../../../scenarios/twitter/TwitterAgent";

export default class ActionRead extends Action {
  execute(agent: Agent): void {
    const aux: TwitterAgent = <TwitterAgent>agent;
    if (aux.state === AgentState.NOT_READ) {
      const p1: number = this.getRandom();
      if (p1 > 100 - this.probability) {
        aux.state = AgentState.READ;
      }
    }
  }

  createAction(actionData: MetaActionConfig): Action {
    return new ActionRead().setConfig(actionData);
  }
}
