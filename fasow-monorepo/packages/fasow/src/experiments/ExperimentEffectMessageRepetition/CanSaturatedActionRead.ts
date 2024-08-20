import Agent from "../../fasow/abm/Agent";
import { AgentState } from "../../fasow/abm/interfaces/Agent/AgentState";
import ActionRead from "../../fasow/abm/wom/custom-actions/ActionRead";
import EffectAgent from "./EffectAgent";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
import Action from "../../fasow/abm/Action";

export default class CanSaturatedActionRead extends ActionRead {
  execute(agent: Agent) {
    if(agent instanceof EffectAgent){// Si es de este tipo de agente
      const agentRef = (<EffectAgent>agent);
      if (agentRef.state === AgentState.NOT_READ ) {// Y si su estado es no leido
        const p1: number = this.getRandom();// Calcula la probabilidad de leer
        if (p1 > 100 - this.probability) {  // Si se cumplen las condiciones
          agentRef.state = AgentState.READ; // Marca como leido
          agentRef.times_read_counter += 1 // Aumenta en 1 las veces leido (esto equivale al saturation lvl)
          // console.log("agentRef.id: ", agentRef.id, " times_Read: ", agentRef.times_read_counter)
          if(agentRef.times_read_counter > EffectAgent.saturationThreshold ){ // Si has leido mas de 5 veces
            agentRef.isSaturated = true;// Marca como saturado.
          }
        }
      }
    }
  }

  createAction(actionData: MetaActionConfig): Action {
    return new CanSaturatedActionRead().setConfig(actionData);
  }
}
