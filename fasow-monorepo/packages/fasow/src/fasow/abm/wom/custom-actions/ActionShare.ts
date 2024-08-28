import MetaActionConfig from "../../../config/metaconfig/MetaActionConfig";
import TwitterAgent from "../../../scenarios/twitter/TwitterAgent";
import Action from "../../Action";
import Agent from "../../Agent";
import {AgentState} from "../../interfaces/Agent/AgentState";

export default class ActionShare extends Action {
  execute(agent: Agent): void {
    const aux: TwitterAgent = <TwitterAgent>agent;
    if (aux.state === AgentState.READ) {
      const p1: number = this.getRandom();
      if (p1 > 100 - this.probability) {
        aux.state = AgentState.READY_TO_SHARE;
      }
    }
  }

  createAction(actionData: MetaActionConfig): Action {
    return new ActionShare().setConfig(actionData);
  }
}
