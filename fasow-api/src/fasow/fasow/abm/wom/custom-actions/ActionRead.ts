import MetaActionConfig from '../../../config/metaconfig/MetaActionConfig';
import Action from '../../Action';
import Agent from '../../Agent';
import { AgentState } from '../../interfaces/Agent/AgentState';
import TwitterAgent from '../../../scenarios/twitter/TwitterAgent';

export default class ActionRead extends Action {
  /* Todo: maybe we can move this to Action ?
      Esto es un comportamiento que siempre se debe
      agregar si lo que se quiere es que el comportamiento DEFINIDO
      EN LA ACCION NO Se ejecute SIEMPRE, ya que 'Execute' siempre
      es ejecutado, por lo que si queremos que de verdad no se ejecute
      el comportamiento establecido en la Accion, entonces debemos hacer
      uso de este condicional.

      Por otro lado la 'ActionRead' es algo basico en el WOM process.
      por lo que ya posee la transicion de estados y el condicional.

      Por lo que si se desea extender el proceso de comunicacion WOM.
      entonces se debera definir este condicional, por otro lado.

      Si se quiere trabajar sobre las etapas ya definidas, entonces
      se puede extender las acciones ya establecidas por WOM en FASOW

      AgentState.NOT_READ = 0,
      AgentState.READ = 1,
      AgentState.READY_TO_SHARE = 2,
      AgentState.SHARED = 3,

   */
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
