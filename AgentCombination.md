

Para este caso se queria responder 2 preguntas.

1.- En una red social, probar una camapania de marketing wom  donde conviven diferentes combinaciones de tipos de agentes, necesitamos identificar cual
es el el typo de agente que logra compartir o  hacer vivir por mas tiempo el mismo mensaje

2.- Por otro lado necesito, crear diferentes simulaciones, que representen diferentes scenarios:
    - Una donde todos los agentes sean promedio, y otro porcentaje de agentes sean semillas y hub.
    - Una donde todos los agentes ean promedio, y otro porcentaje de agentes sean semillas, y leader.
    - Una donde todos los agentes sean promedio, y las semillas tambien.
De esta forma comparar cada uno de los scenarios y ver cual tipo de agente es mejor para comenzar la camapania

Para el primer caso, solo se necesito la primera capa Calibration, por lo que se crea un nuevo Experiment (Calibration)
llamado ExperimentAgentCombination

```typescript
import FASOW from 'src/fasow';
import Experiment from 'src/fasow/fasow/abm/Experiment';
import { AgentState } from 'src/fasow/fasow/abm/interfaces/Agent/AgentState';
import ActionRead from 'src/fasow/fasow/abm/wom/custom-actions/ActionRead';
import ActionShare from 'src/fasow/fasow/abm/wom/custom-actions/ActionShare';
import MetaActionConfig from 'src/fasow/fasow/config/metaconfig/MetaActionConfig';
import MetaAgentConfig from 'src/fasow/fasow/config/metaconfig/MetaAgentConfig';
import { ExperimentCount } from 'src/fasow/fasow/datahandler/decorators/DataHandlerDecorators';
import EnvironmentTwitter from 'src/fasow/fasow/scenarios/twitter/EnvironmentTwitter';
import TwitterAgent from 'src/fasow/fasow/scenarios/twitter/TwitterAgent';

export default class ExperimentAgentCombination extends Experiment {

  createExperiment(): Experiment {
    return new ExperimentAgentCombination();
  }
}
```

En este caso, lo mas complejo era como definir las configuraciones de los agentes.

Se parte pensando, porque necesito agentes que representen usurios de twitter, y tengan la capacidad de enviar un mensaje.
Entonces puedo usar al agente Twitter, que ya esta predefindo y es parte de la coleccion de Scenarios, entonces para usar TwitterAgent,
necesitaremos de EnvironmentTwitter, que tambien existe en Scenarios.

siguiendo la logica de utilizar un TwitterAgent, tenemos que definir su comportamiento para leer un mensaje y compartirlo
para eso entonces necesitamos las acciones de leer y compartir, que solo se les indica la probabilidad de ser ejecutadas.

Entonces teniendo agentes y acciones ya previamente existentes, pasamos a solo preocuparnos por armar sus configuraciones
y pasarle sus parametros correctamente.

Por lo tanto ya sabemos las clases que necesitamos, por lo que las registramos con el TowerHandler.

```typescript 
export default class ExperimentAgentCombination extends Experiment {
  
  Strategy() {
    /...
    FASOW.TowerHandler.registerNewAgent(TwitterAgent);
    FASOW.TowerHandler.registerNewAction(ActionRead);
    FASOW.TowerHandler.registerNewAction(ActionShare);
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter);
  }
}
```

Entonces ahora nos preocupamos de generar las configuraciones, como queremos combinar la creacion de diferentes tipos de agentes.
queremos agentes hub(tienen un 19,3% de compartir un mensaje que leyo y tienen un 1.142% del total de la red social como Seguidores), leaders(
tienen un 25.09% de probabilidades de compartir un mensaje que leyo y tienen un 1.08% del total de la red social como seguidores) and 
averages(tinene un 19.3% de probabilidades de compartir un mensaje que leyo, y un total del 0.057% de seguidores respecto al total de usuarios de la red social ).

Para continuar previamente definiremos los porcentajes de agentes que se debe tener y que se crearan respecto al total de usuarios de la red social.
ademas se define y se decora percentageTypes para conocer los % de tipos de agantes que se utilizaran.
Se marco como un ExperimentCount, por lo que datahandler preguntara el estado de esta variable siempre
que se le notifique un cambio de iteracion.

```typescript
export default class ExperimentAgentCombination extends Experiment {

  public percentageAvr: number = 95;
  public finalPercentageHub: number = 2.5;
  public finalPercentageLeader: number = 2.5;
  public seedPercentage: number = 5;

  @ExperimentCount('percentage-type') public percentageTypes: string = '';

}
```

Todos los agentes tenian el mismo % de probabilidades de leer o no un mensaje que podria llegar a sus perfiles.

por lo que lo importante de getMetaConfig, es almacenar los valores constantes de cada tipo de agente (hub, leader or average)
y retornar la MetaAgent config de un tipo de agente que se quiere instanciar, por esto es que ademas la funcion
requiere 


el nombre, del tipo de agente que se quiere la MetaAgentConfig
el porcentaje de agentes respecto a la red social, de instancias que se quiere crear.
el indicador `seed` para indicar si sera un agente que comenzara el proceso de comunicacion WOM enviando un mensaje.
y el estado inicial con el que se quiere que el agente se instancie.


```typescript
class ExperimentAgentCombination extends Experiment{
  
  public static getMetaConfig(
    name: string,
    percentage: number,
    seed: boolean,
    state: number,
  ): MetaAgentConfig {
    const configRead: MetaActionConfig = {
      id: 0,
      name: 'default-read',
      type: ActionRead,
      probability: 50,
    };
    switch (name) {
      case 'hub':
        return {
          id: 0,
          name: 'hub',
          type: TwitterAgent,
          percentage,
          isSeed: seed,
          state,
          followersPercentage: 1.14225,
          actionsConfigs: [
            configRead,
            {
              id: 1,
              name: 'action-share-hub',
              type: ActionShare,
              probability: 19.3,
            },
          ],
        };
      case 'leader':
        return {
          id: 1,
          name: 'leader',
          type: TwitterAgent,
          percentage,
          isSeed: seed,
          state,
          followersPercentage: 1.08,
          actionsConfigs: [
            configRead,
            {
              id: 1,
              name: 'action-share-leader',
              type: ActionShare,
              probability: 25.09,
            },
          ],
        };
      default:
        return {
          id: 2,
          type: TwitterAgent,
          percentage,
          isSeed: seed,
          state,
          name: 'average',
          followersPercentage: 0.057,
          actionsConfigs: [
            configRead,
            {
              id: 1,
              name: 'action-share-avr',
              type: ActionShare,
              probability: 19.3,
            },
          ],
        };
    }
  }
}

```

procedemos a usar esta funcion en la strategy

```typescript
const avrConfig: MetaAgentConfig = ExperimentAgentCombination.getMetaConfig(
  'average',
  this.percentageAvr,
  false,
  AgentState.NOT_READ,
);
const hubConfig: MetaAgentConfig = ExperimentAgentCombination.getMetaConfig(
  'hub',
  this.finalPercentageHub,
  true,
  AgentState.READY_TO_SHARE,
);
const leaderConfig: MetaAgentConfig =
  ExperimentAgentCombination.getMetaConfig(
    'leader',
    this.finalPercentageLeader,
    true,
    AgentState.READY_TO_SHARE,
  );

FASOW.TowerHandler.setScenarioConfig({
  networkSize: 10000,
  maxTick: 20,
  environmentType: EnvironmentTwitter,
  metaAgentsConfigs: [avrConfig, hubConfig, leaderConfig],
});

FASOW.TowerHandler.setScenarioConfig({
  networkSize: 10000,
  maxTick: 20,
  environmentType: EnvironmentTwitter,
  metaAgentsConfigs: [avrConfig, hubConfig, leaderConfig],
});
```

con eso creamos las MetaAgentCombinations, seteamos el total de agentes de la red
y el tiempo maximo de la duracion de la simulacion.

Por ultimo era necesario sobreescribir el metodo run, para manejar de mejor forma
el como la simulacion se ejecutara por lo que 

```typescript
export default class ExperimentAgentCombination extends Experiment {

  run() {
    for (let i: number = 10; i < 100; i += 10) {
      this.setMaxRepetition(1);
      const percentageHubOfSeed: number = i;
      const percentageLeaderOfSeed: number = 100 - i;
      console.log('Calculating Percentages of seeds Combinations');
      console.log(
        'Hub: ',
        percentageHubOfSeed,
        'Leader: ',
        percentageLeaderOfSeed,
      );
      this.finalPercentageHub =
        (percentageHubOfSeed * this.seedPercentage) / 100;
      this.finalPercentageLeader =
        (percentageLeaderOfSeed * this.seedPercentage) / 100;
      this.percentageAvr = 95;
      this.percentageTypes = `Hub: ${this.finalPercentageHub} Leader: ${this.finalPercentageLeader} Average: ${this.percentageAvr}`;
      console.log('Finals Agents Percentages: ');
      console.log(this.percentageTypes);
      super.run();
      this.resetRepetitions();
    }
  }
}
```

Entonces extendiendo y sobreescribiendo run podemos manejar las repeticiones del experimiento.

vamos a repetir 10 veces, y vamos ir de 10 en 10
al iniciar una repeticion, seteamos el maximo en 1,

calculamos los porcentajes de combinacion de hub y leaders, haciendo que el otro 95% sea average

Y ahora al cambiar entre iteraciones, cambiaremos el porcentaje de tipos de agente hub y leader que se crearan como semillas 
para ir combinando e iterando sobre los diferentes % de agentes hub y leader, buscando la mejor combinacion.

