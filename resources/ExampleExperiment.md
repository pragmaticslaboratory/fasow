# Steps to implement a Simple Calibration

## Context
We want to create types of seed users to share a specific message and propagate the them, trough 
the SNS, we will potitionate in the case of X.com (previously twitter)

Entonces necesito un usuario que lea un mensaje, y al leerlo tome la decisión de compartirlo o no con alguno de sus seguidores o suscriptores.

Quiero simular una situación en Twitter donde un usuario envía un mensaje a otro usuario. El usuario receptor tiene la posibilidad de leer o no leer ese mensaje, y luego, según sea la condición, si es que lee el mensaje también existe una probabilidad de compartir el mensaje con uno o varios usuarios.

Cada decisión de los usuarios ocurre en un tiempo discreto.

Definimos que un usuario, a través del tiempo, al tomar una decisión adquiere un estado asociado a ese momento en el tiempo.

Por lo tanto creamos un experimento.

## 1. Create a Calibration

```typescript tsx
import FASOW from '../fasow';
import Experiment from '../fasow/fasow/abm/Experiment';
import ActionRead from '../fasow/fasow/abm/wom/custom-actions/ActionRead';
import ActionShare from '../fasow/fasow/abm/wom/custom-actions/ActionShare';
import EnvironmentTwitter from '../fasow/fasow/scenarios/twitter/EnvironmentTwitter';
import TwitterAgent from '../fasow/fasow/scenarios/twitter/TwitterAgent';
import { AgentState } from '../fasow/fasow/abm/interfaces/Agent/AgentState';

export default class ExampleExperiment extends Experiment {

    Strategy(): void {
    
    }
    createExperiment(): Experiment {
        return new ExampleExperiment();
    }
}

```

### 1.1 Registration of the classes that will being used. 

```typescript tsx
import FASOW from '../fasow';
import Experiment from '../fasow/fasow/abm/Experiment';
import TwitterAgent from '../fasow/fasow/scenarios/twitter/TwitterAgent';
import ActionRead from '../fasow/fasow/abm/wom/custom-actions/ActionRead';
import ActionShare from '../fasow/fasow/abm/wom/custom-actions/ActionShare';

export default class ExampleExperiment extends Experiment {

    Strategy(): void {
        // Cargamos al agente que simula a un usuario de twitter
        FASOW.TowerHandler.registerNewAgent(TwitterAgent);
        //Cargamos las acciones que permiten leer y compartir
        FASOW.TowerHandler.registerNewAction(ActionRead);
        FASOW.TowerHandler.registerNewAction(ActionShare);
        //Cargamos el ambiente simulado de twitter
        FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter);
    }
}
```

### 1.2 Configuramos a los agentes semillas y los no semillas mediante las MetaAgentConfig
```typescript tsx
import FASOW from '../fasow';
import Experiment from '../fasow/fasow/abm/Experiment';
import TwitterAgent from '../fasow/fasow/scenarios/twitter/TwitterAgent';
import ActionRead from '../fasow/fasow/abm/wom/custom-actions/ActionRead';
import ActionShare from '../fasow/fasow/abm/wom/custom-actions/ActionShare';
import { AgentState } from '../fasow/fasow/abm/interfaces/Agent/AgentState';
import EnvironmentTwitter from '../fasow/fasow/scenarios/twitter/EnvironmentTwitter';


export default class ExampleExperiment extends Experiment {

    Strategy(): void {
        //...Loading of classes to use

        // Use the classes
        // The first configuration will be 
        // An 5% of users of the network that will send a message to their followers
        const agent1 : MetaAgentConfig = {
            id: 0,
            name: 'seed',
            isSeed: true,
            state: AgentState.READY_TO_SHARE,
            type: TwitterAgent,
            percentage: 5,
            followersPercentage: 3,
            followingsPercentage: 0,
            actionsConfigs: [
                {
                    id: 0,
                    name: 'read1',
                    type: ActionRead,
                    probability: 5,
                },
                {
                    id: 1,
                    name: 'share',
                    type: ActionShare,
                    probability: 5,
                },
            ],
        };
        // Other configuration of users where at 95% of users that can receive the message from seeds agents that the non-seeds were friends
        const agent2 : MetaAgentConfig = {
            id: 1,
            name: 'non-seeds',
            isSeed: false,
            state: AgentState.NOT_READ,
            type: TwitterAgent,
            percentage: 95,
            followingsPercentage: 3,
            followersPercentage: 3,
            actionsConfigs: [
                {
                    id: 0,
                    name: 'read1',
                    type: ActionRead,
                    probability: 5,
                },
                {
                    id: 1,
                    name: 'share',
                    type: ActionShare,
                    probability: 5,
                },
            ],
        };
    }
}
```
### 1.3 Setting the config of the scenario

```typescript jsx

import FASOW from '../fasow';
import Experiment from '../fasow/fasow/abm/Experiment';
import TwitterAgent from '../fasow/fasow/scenarios/twitter/TwitterAgent';
import ActionRead from '../fasow/fasow/abm/wom/custom-actions/ActionRead';
import ActionShare from '../fasow/fasow/abm/wom/custom-actions/ActionShare';
import { AgentState } from '../fasow/fasow/abm/interfaces/Agent/AgentState';
import EnvironmentTwitter from '../fasow/fasow/scenarios/twitter/EnvironmentTwitter';

export default class ExampleExperiment extends Experiment {
  Strategy(): void {
    //...Loaded Classes
    //...Defined  types of MetaAgentConfigs that allow to setup the network users  
    
    /*...Now we configure the scenario, defining the size of the network (quantity of agents to create),
      the iteration time, and the meta agent configs. 
    */
    FASOW.TowerHandler.setScenarioConfig({
      networkSize: 1000,
      maxTick: 10,
      environmentType: EnvironmentTwitter,
      metaAgentsConfigs: [agent1, agent2],
    });
  }
}


```

### 1.4 Finally adding the details of the Calibration

```typescript jsx
import FASOW from '../fasow';
import Experiment from '../fasow/fasow/abm/Experiment';
import TwitterAgent from '../fasow/fasow/scenarios/twitter/TwitterAgent';
import ActionRead from '../fasow/fasow/abm/wom/custom-actions/ActionRead';
import ActionShare from '../fasow/fasow/abm/wom/custom-actions/ActionShare';
import { AgentState } from '../fasow/fasow/abm/interfaces/Agent/AgentState';
import EnvironmentTwitter from '../fasow/fasow/scenarios/twitter/EnvironmentTwitter';

export default class ExampleExperiment extends Experiment { 
  Strategy(): void {
    // ... Loaded classes
    //...Loaded Classes
    //...Defined  types of MetaAgentConfigs that allow to setup the network user
    //...Defined scenario that sets the limits of the network, the configurations of the users and the duration of the simulation
      
    FASOW.TowerHandler.setExperimentName('Experiment-Example');
    FASOW.TowerHandler.setExperimentMaxRepetitions(2);
    FASOW.TowerHandler.setExperimentDescription('Nothing');
  }
}
```

## 2.0 Add the new Calibration on the `fasowLoader.ts`

```typescript jsx
import ExampleExperiment from './experiments/ExampleExperiment';

const fasowConfig = [
    /** Add your Experiments below **/
    ExampleExperiment,
];

export default fasowConfig;
```

## 3.0 We open the UI

### 3.1 Open a new terminal to load the api
```bash
   cd fasow-api
   npm run start:dev

```
### 3.2 Open another terminal to load the UI
```bash
   cd ..
   cd fasow-ui/
   npm run dev

```
### 3.3 Open the Web browser and select the created calibration

![Fasow Select Example Calibration](fasow-ui-example-config.png)

### 3.4 Run the simulation

![Fasow UI2](fasow-ui-example-calibration.png)

### 3.5 View the output.

![Fasow UI](fasow-ui-example-calibration.png)

