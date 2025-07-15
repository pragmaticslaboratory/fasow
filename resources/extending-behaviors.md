
## Extending Behaviors

With the use of the Reflection Tower and with the Four Levels of abstraction that provides Fasow
we can extend the functionality of Fasow by the creation of:

1. **New Experiments**: To Implement a new Model to simulate on Fasow!.
2. **New Environments**: To Adding new Social Network Sites (like the Reddit Social Network) or a specific Agent management rule.
3. **New Agents**: To Adding new behaviors, logic or states that could have an Agent.
4. **New Actions**: To Adding new ways to send or receive a message or change the state of the agent in some circumstance.

Whichever will be the approach to follow, always we will have to Register this new Behavior on Fasow with the use of the TowerHandler.
```typescript
//..experiments/ExampleExperiment.ts
class ExampleExperiment extends Experiment {
  // ... other logic
  Strategy(): void {
    Fasow.TowerHandler.registerNewAgent(TwitterAgent); //Registering a new Agent on Fasow
    Fasow.TowerHandler.registerNewAction(ActionRead); //Registering a new Action on Fasow
    Fasow.TowerHandler.registerNewAction(ActionShare); //Registering a new Action on Fasow
    Fasow.TowerHandler.registerNewEnvironment(EnvironmentTwitter); // Registering a new Action on Fasow
  }
}
```

However, the `Experiments` must be Registered on Fasow, by importing them manually and adding to the `fasowLoader.ts` file
as the following way:

```typescript
//..fasowLoader.ts
import CalibrationCase1 from 'src/experiments/ExperimentAgentCombinatio/CalibrationCase1';
import ExperimentAgentCombinationBestSeed from 'src/experiments/ExperimentAgentCombinatio/ExperimentAgentCombinationBestSeed';
import ExampleExperiment from './experiments/ExampleExperiment';
import TestExperiment from './experiments/TestExperiment/TestExperiment';

const fasowConfig = [
  CalibrationCase1,
  ExperimentAgentCombinationBestSeed,
  ExampleExperiment,
  /** Add your Experiments below to register them on Fasow**/
  TestExperiment, //Here you are registering your Experiments
];

export default fasowConfig;
```

### Extending The Experiment Level.
### Extending The Agent Level.
### Extending The Environment Level.

### Extending Action Layer.
By extending the funtionality of the action layers we can add new behaviors to handle how to send, receive
the message or change some state in the Agents by the execution of some rules.

To do this we need to create a new `Action` that extends the `Abstract Action` like this:
```typescript
class TestAction extends Action {
  createAction(actionData: MetaActionConfig): Action {
    return new TestAction().setConfig(actionData);
  }

  execute(agent: Agent): void {
    agent.receiveMessage();
    console.log('TestAction specialized Behavior');
  }
}
```
Then we need to register this new action with the TowerHandler to allow to Fasow can use them.

```typescript
// TODO: Imports must be fixed because Fasow not exists in that path xd
import Fasow from "./Fasow";
```
Also, to maintain the Fasow logic this must be done in definition of the Strategies on the Experiments.

```typescript
import Fasow from "./Fasow";
import Experiment from "./Experiment";


class ExampleExperiment extends Experiment {
  // ... other logic
  Strategy(): void {
    Fasow.TowerHandler.registerNewAction(TestAction); // Register the new Action on the Experiment Strategy
  }
}
```