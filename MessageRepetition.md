Pasos para implementar message repetition:
1.- Crear nuevo experimento (Calibration) que extiende de (Abstract Experiment) (abstract Calibration ahora).
2.- luego hay que de definir la strategy del experimento.  
y aqui de cierta forma se piensa en las cosas que se deben hacer y que se necesitan, entonces:

Quiero que los usuarios puedan reenviar un mensaje muchas veces, y que cuando sus seguidores vean el mismo mensaje N veces, que en algun momento se saturen.

Entonces necesito un usuario que lea, un mensaje, y al leerlo tome la decision de compartirlo o no el mensaje con alguno de sus seguidores , suscriptor o algo asi.

```typescript
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

```

Luego
Para manejar el como leer, necesito crear un action read
Y luego para manejar el como enviar, se necesito crear un action share.

entonces se hizo esto:
Action Read

```typescript
import Agent from '../../fasow/fasow/abm/Agent';
import { AgentState } from '../../fasow/fasow/abm/interfaces/Agent/AgentState';
import ActionRead from '../../fasow/fasow/abm/wom/custom-actions/ActionRead';
import EffectAgent from './EffectAgent';
import MetaActionConfig from '../../fasow/fasow/config/metaconfig/MetaActionConfig';
import Action from '../../fasow/fasow/abm/Action';

export default class CanSaturatedActionRead extends ActionRead {
  execute(agent: Agent) {
    if (agent instanceof EffectAgent) {
      // Si es de este tipo de agente
      const agentRef = <EffectAgent>agent;
      if (agentRef.state === AgentState.NOT_READ) {
        // Y si su estado es no leido
        const p1: number = this.getRandom(); // Calcula la probabilidad de leer
        if (p1 > 100 - this.probability) {
          // Si se cumplen las condiciones
          agentRef.state = AgentState.READ; // Marca como leido
          agentRef.times_read_counter += 1; // Aumenta en 1 las veces leido (esto equivale al saturation lvl)
          // console.log("agentRef.id: ", agentRef.id, " times_Read: ", agentRef.times_read_counter)
          if (agentRef.times_read_counter > EffectAgent.saturationThreshold) {
            // Si has leido mas de 5 veces
            agentRef.isSaturated = true; // Marca como saturado.
          }
        }
      }
    }
  }

  createAction(actionData: MetaActionConfig): Action {
    return new CanSaturatedActionRead().setConfig(actionData);
  }
}

```

Action Share

```typescript
import Agent from '../../fasow/fasow/abm/Agent';
import { AgentState } from '../../fasow/fasow/abm/interfaces/Agent/AgentState';
import ActionShare from '../../fasow/fasow/abm/wom/custom-actions/ActionShare';
import EffectAgent from './EffectAgent';
import Action from '../../fasow/fasow/abm/Action';
import MetaActionConfig from '../../fasow/fasow/config/metaconfig/MetaActionConfig';

/*
La accion de compartir se ejecutara siempre y cuando se haya leido, el agente no este saturado
y se satisfasga la probabilidad de compartir.
 */
export default class CanSaturatedActionShare extends ActionShare {
  execute(agent: Agent) {
    if (agent instanceof EffectAgent) {
      // Si es de este tipo de agente
      const agentRef = <EffectAgent>agent;
      if (agentRef.state === AgentState.READ && !agentRef.isSaturated) {
        // Mientras haya leido y no este saturado, entonces puede compartir
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

```

El tema principal es preocuparnos de generar una red social que permita la repeticion de mensajes,
y agentes que se saturen, entoces, se genera este environment.

```typescript

import Environment from '../../fasow/fasow/abm/Environment';
import MetaEnvironmentConfig from '../../fasow/fasow/config/metaconfig/MetaEnvironmentConfig';
import EnvironmentTwitter from '../../fasow/fasow/scenarios/twitter/EnvironmentTwitter';

export default class EffectTwitter extends EnvironmentTwitter {
  public postOfCompanies: number = 4;
  public periodsToShare: number[] = [];

  run() {
    this.calculatePeriodsToRepost();
    console.log('PostOfCompanies: ', this.postOfCompanies);
    console.log('Periods to Repost: ', this.periodsToShare);
    super.run();
  }

  private calculatePeriodsToRepost() {
    for (let i = 0; i < this.postOfCompanies; i += 1) {
      const periodToShare: number = Math.round(
        Math.random() * (this.getMaxTick() - 1),
      );
      this.periodsToShare.push(periodToShare);
    }
  }

  private isAPeriodToReShare(): boolean {
    const period = this.getTick();
    let auxBool: boolean = false;
    this.periodsToShare.forEach((p) => {
      if (period === p) {
        auxBool = true;
      }
    });
    return auxBool;
  }

  step() {
    if (this.getTick() > 0 && this.isAPeriodToReShare()) {
      console.log('ReSending');
      this.resetSeedStates();
    }
    super.step();
  }

  createEnvironment(environmentConfig: MetaEnvironmentConfig): Environment {
    return new EffectTwitter().setConfig(environmentConfig);
  }
}


```

Finalmente ya con todo eso solo nos falta registrar las nuevas clases o componentes.
pensar en como crear las configuraciones, y
setear la configuracion

```typescript
import FASOW from 'src/fasow';
import Experiment from '../../fasow/fasow/abm/Experiment';
import { AgentState } from '../../fasow/fasow/abm/interfaces/Agent/AgentState';
import MetaActionConfig from '../../fasow/fasow/config/metaconfig/MetaActionConfig';
import MetaAgentConfig from '../../fasow/fasow/config/metaconfig/MetaAgentConfig';
import CanSaturatedActionRead from './CanSaturatedActionRead';
import CanSaturatedActionShare from './CanSaturatedActionShare';
import EffectAgent from './EffectAgent';
import EnvironmentEffectTwitter from './EnvironmentEffectTwitter';

export default class MessageRepetition extends Experiment {
  Strategy(): void {
    FASOW.TowerHandler.registerNewAction(CanSaturatedActionShare);
    FASOW.TowerHandler.registerNewAction(CanSaturatedActionRead);
    FASOW.TowerHandler.registerNewAgent(EffectAgent);
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentEffectTwitter);

    const actionReadConfig: MetaActionConfig = {
      id: 0,
      name: 'read',
      type: CanSaturatedActionRead,
      probability: 6.3,
    };
    const actionShareConfig: MetaActionConfig = {
      id: 1,
      name: 'share',
      type: CanSaturatedActionShare,
      probability: 5,
    };
    const avrAgentConfig: MetaAgentConfig = {
      id: 0,
      followersPercentage: 0.01306,
      actionsConfigs: [actionReadConfig, actionShareConfig],
      name: 'possible saturated agent',
      type: EffectAgent,
      percentage: 95,
      state: AgentState.NOT_READ,
      isSeed: false,
    };
    const avrAgentConfigSeed: MetaAgentConfig = {
      id: 1,
      followersPercentage: 0.01306,
      actionsConfigs: [actionReadConfig, actionShareConfig],
      name: 'possible saturated agent',
      type: EffectAgent,
      percentage: 5,
      isSeed: true,
      state: AgentState.READY_TO_SHARE,
    };

    FASOW.TowerHandler.setExperimentName('Effect of Message Repetition');
    FASOW.TowerHandler.setExperimentDescription(
      'This experiment is for analyze the effect of message repetition in twitter agents on wom marketing campaings',
    );
    FASOW.TowerHandler.setScenarioConfig({
      networkSize: 10000,
      environmentType: EnvironmentEffectTwitter,
      maxTick: 40,
      metaAgentsConfigs: [avrAgentConfig, avrAgentConfigSeed],
    });
    this.setMaxRepetition(1);
  }

  createExperiment(): Experiment {
    return new MessageRepetition();
  }
}

```
luego desde el front end se hacia asi