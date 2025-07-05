# Agent Combination 

For this case, we wanted to answer 2 questions.

1.- In a social network, testing a WOM marketing campaign where different combinations of agent types coexist, we need to identify which
type of agent manages to share or keep the same message alive for a longer time

2.- On the other hand, we need to create different simulations that represent different scenarios:
- One where all agents are average, and another percentage of agents are seeds and hub.
- One where all agents are average, and another percentage of agents are seeds, and leader.
- One where all agents are average, and the seeds as well.
This way we can compare each of the scenarios and see which type of agent is best to start the campaign

For the first case, only the first Calibration layer was needed, so a new Experiment (Calibration)
called ExperimentAgentCombination is created

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

The most complex part was how to define the agent configurations.

We start by thinking that we need agents that represent Twitter users and have the ability to send a message.
So we can use the Twitter agent, which is already predefined and is part of the Scenarios collection, so to use TwitterAgent,
we'll need EnvironmentTwitter, which also exists in Scenarios.

Following the logic of using a TwitterAgent, we have to define its behavior for reading a message and sharing it.
For this, we need the read and share actions, which are only indicated by the probability of being executed.

So having previously existing agents and actions, we only need to worry about setting up their configurations
and passing their parameters correctly.

Therefore, we already know the classes we need, so we register them with the TowerHandler.
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

Now we focus on generating the configurations, as we want to combine the creation of different types of agents.
We want hub agents (who have a 19.3% chance of sharing a message they read and have 1.142% of the total social network as Followers), leaders
(who have a 25.09% chance of sharing a message they read and have 1.08% of the total social network as followers) and
averages (who have a 19.3% chance of sharing a message they read, and a total of 0.057% followers with respect to the total users of the social network).

To continue, we'll first define the percentages of agents that should exist and that will be created with respect to the total social network users.
Additionally, percentageTypes is defined and decorated to track the % of agent types that will be used.
It was marked as an ExperimentCount, so datahandler will query the state of this variable whenever
a change in iteration is notified.

```typescript
export default class ExperimentAgentCombination extends Experiment {

  public percentageAvr: number = 95;
  public finalPercentageHub: number = 2.5;
  public finalPercentageLeader: number = 2.5;
  public seedPercentage: number = 5;

  @ExperimentCount('percentage-type') public percentageTypes: string = '';

}
```

All agents had the same % probability of reading or not reading a message that could reach their profiles.

So the important thing about getMetaConfig is to store the constant values for each type of agent (hub, leader or average)
and return the MetaAgent config of the type of agent that needs to be instantiated, which is why the function
also requires:

the name of the agent type for which the MetaAgentConfig is wanted
the percentage of agents relative to the social network, of instances to be created.
the `seed` indicator to indicate if it will be an agent that will start the WOM communication process by sending a message.
and the initial state with which the agent should be instantiated.

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

We proceed to use this function in the strategy

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

With that we create the MetaAgentCombinations, set the total number of agents in the network
and the maximum duration time of the simulation.

Finally, it was necessary to override the run method, to better manage
how the simulation will be executed, so

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

So by extending and overriding run we can manage the experiment repetitions.

We will repeat 10 times, and we will go from 10 to 10
When starting a repetition, we set the maximum to 1,

We calculate the combination percentages of hub and leaders, making the other 95% be average

And now when changing between iterations, we will change the percentage of hub and leader agent types that will be created as seeds
to combine and iterate over the different % of hub and leader agents, looking for the best combination.
