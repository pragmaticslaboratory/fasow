import Agent from "../../fasow/abm/Agent";
import {AgentState} from "../../fasow/abm/interfaces/Agent/AgentState";
import ActionShare from "../../fasow/abm/wom/custom-actions/ActionShare";
import EffectAgent from "./EffectAgent";
import Action from "../../fasow/abm/Action";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";


/*
La accion de compartir se ejecutara siempre y cuando se haya leido, el agente no este saturado
y se satisfasga la probabilidad de compartir.
 */
export default class CanSaturatedActionShare extends ActionShare {
  execute(agent: Agent) {
      if(agent instanceof EffectAgent){// Si es de este tipo de agente
          const agentRef = (<EffectAgent>agent);
          if (agentRef.state === AgentState.READ && !agentRef.isSaturated) { // Mientras haya leido y no este saturado, entonces puede compartir
              const p1: number = this.getRandom();
              if (p1 > 100 - this.probability) {
                  agentRef.state = AgentState.READY_TO_SHARE;
              } else {
                  agentRef.state = AgentState.NOT_READ;
              }
          }
      }
  }

  createAction(actionData: MetaActionConfig): Action {
      return new CanSaturatedActionShare().setConfig(actionData);
  }
}
