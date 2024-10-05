Para encontrar el mejor tipo de usuario para ser usuario semilla para iniciar una campania
de marketing wom en sitios de redes sociales, debemos crear un nuevo experimento

```typescript
export default class ExperimentAgentCombinationBestSeed extends Experiment {}
```

Ahora definimos ciertas variables de inicializacion, seteando el % de agentes semillas,
su porcentaje de seguidores respecto al tamanio de la red social, y el % de agentes no semillas.

ademas inicializamos la variable seedType que indica el nombre del tipo de agente a utilizar,
y la decoramos para registrar su valor cada vez que una iteracion notifique al datahandler.

```typescript
export default class ExperimentAgentCombinationBestSeed extends Experiment {
  // who is the better seed ?
  // avr --> hub --> leader
  @ExperimentCount("seed-type")
  public seedType: string = "hub";

  public seedFollowerPercentage: number = 0;
  public nonSeedPercentage = 95;
  public seedPercentage = 5;
}
```

Una vez con eso debemos crear nuestra estrategia, en este caso como el % de usuarios semillas y usuarios no semillas
es constante pero lo que varia es el tipo del agente, respecto a si es average, o hub o leader como mejor tipo
para ser semilla. Entonces lo importante es concentrarnos en definir correctamente las acciones de leer y compartir.

Por lo tanto registramos el `TwitterAgent, ActionRead, ActionShare y el EnvironmentTwitter` desde la coleccion disponible de Twitter
en Scenarios.

```typescript
export default class ExperimentAgentCombinationBestSeed extends Experiment {
  Strategy(): void {
    // Registration of the used components.
    FASOW.TowerHandler.registerNewAgent(TwitterAgent);
    FASOW.TowerHandler.registerNewAction(ActionRead);
    FASOW.TowerHandler.registerNewAction(ActionShare);
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter);

    // Defining The MetaExperimentConfiguration.
    const nonSeedConfig: MetaAgentConfig = {
      id: 0,
      name: "average",
      isSeed: false,
      type: TwitterAgent,
      percentage: this.nonSeedPercentage,
      state: AgentState.NOT_READ,
      followersPercentage: 0.057,
      actionsConfigs:
        ExperimentAgentCombinationBestSeed.getActionsConfig("average"),
    };
    const seedConfig: MetaAgentConfig = {
      id: 1,
      name: "hub",
      isSeed: true,
      type: TwitterAgent,
      percentage: this.seedPercentage,
      state: AgentState.READY_TO_SHARE,
      followersPercentage: 1.14225,
      actionsConfigs:
        ExperimentAgentCombinationBestSeed.getActionsConfig("hub"),
    };

    FASOW.TowerHandler.setExperimentName(`best seed type ?`);
    FASOW.TowerHandler.setExperimentDescription("Who are the best seed type ?");
    FASOW.TowerHandler.setScenarioConfig({
      networkSize: 1000,
      maxTick: 20,
      environmentType: EnvironmentTwitter,
      metaAgentsConfigs: [nonSeedConfig, seedConfig],
    });
    this.setMaxRepetition(2);
  }
}
```

Como bien se ve, se utiliza el metodo getActionsConfig('average') y getActionsConfig('hub')

```typescript
export default class ExperimentAgentCombinationBestSeed extends Experiment {
  public static getActionsConfig(type: string): MetaActionConfig[] {
    const configRead: MetaActionConfig = {
      id: 0,
      name: "default-read",
      type: ActionRead,
      probability: 50,
    };
    switch (type) {
      case "hub":
        return [
          configRead,
          {
            id: 1,
            name: `read-${type}`,
            type: ActionShare,
            probability: 19.3,
          },
        ];
      case "leader":
        return [
          configRead,
          {
            id: 1,
            name: `read-${type}`,
            type: ActionShare,
            probability: 25.09,
          },
        ];
      default:
        return [
          configRead,
          {
            id: 1,
            name: `read-${type}`,
            type: ActionShare,
            probability: 19.3,
          },
        ];
    }
  }
}
```
Este metodo retorna el tipo de configuraciones de la accion segun el type que se ingrese como parametro.

Y eso es todo! 

Por otro lado las clases mencionadas  `TwitterAgent, ActionRead, ActionShare y el EnvironmentTwitter` son las siguientes: 

```typescript
import Environment from '../../abm/Environment';
import MetaEnvironmentConfig from '../../config/metaconfig/MetaEnvironmentConfig';

export default class EnvironmentTwitter extends Environment {
  step(): void {
    this.agents.forEach((agent) => {
      agent.step();
    });
  }

  createEnvironment(scenarioConfig: MetaEnvironmentConfig): Environment {
    return new EnvironmentTwitter().setConfig(scenarioConfig);
  }
}
```

```typescript
import Agent from '../../abm/Agent';
import { AgentState } from '../../abm/interfaces/Agent/AgentState';
import MetaAgentConfig from '../../config/metaconfig/MetaAgentConfig';
import { AgentStateIntegerCount } from '../../datahandler/decorators/DataHandlerDecorators';

export default class TwitterAgent extends Agent {
  @AgentStateIntegerCount('NOT_READ', AgentState.NOT_READ)
  static NOT_READ: number = AgentState.NOT_READ;

  @AgentStateIntegerCount('READ', AgentState.READ)
  static READ: number = AgentState.READ;

  @AgentStateIntegerCount('READY_TO_SHARE', AgentState.READY_TO_SHARE)
  static READY: number = AgentState.READY_TO_SHARE;

  @AgentStateIntegerCount('SHARED', AgentState.SHARED)
  static SHARED: number = AgentState.SHARED;

  step(): void {
    if (this.state === TwitterAgent.READY) {
      this.share();
      this.state = TwitterAgent.SHARED;
    }
  }

  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    return new TwitterAgent().setConfig(id, agentData);
  }

  update(message: any): any {
    this.actions.forEach((action) => action.execute(this));
    return message;
  }
}

```

Y las respectivas acciones

```typescript
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
// ActionRead

```

```typescript

import MetaActionConfig from '../../../config/metaconfig/MetaActionConfig';
import TwitterAgent from '../../../scenarios/twitter/TwitterAgent';
import Action from '../../Action';
import Agent from '../../Agent';
import { AgentState } from '../../interfaces/Agent/AgentState';

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
//Action Share
```