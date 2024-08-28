import FASOW from '../index';
import Experiment from '../fasow/abm/Experiment';
import { AgentState } from '../fasow/abm/interfaces/Agent/AgentState';
import ActionRead from '../fasow/abm/wom/custom-actions/ActionRead';
import ActionShare from '../fasow/abm/wom/custom-actions/ActionShare';
import EnvironmentTwitter from '../fasow/scenarios/twitter/EnvironmentTwitter';
import TwitterAgent from '../fasow/scenarios/twitter/TwitterAgent';

export default class ExampleExperiment extends Experiment {
  // eslint-disable-next-line class-methods-use-this
  Strategy(): void {
    FASOW.TowerHandler.registerNewAgent(TwitterAgent);
    FASOW.TowerHandler.registerNewAction(ActionRead);
    FASOW.TowerHandler.registerNewAction(ActionShare);
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter);
    const agent1 = {
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
    const agent2 = {
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
    FASOW.TowerHandler.setScenarioConfig({
      networkSize: 1000,
      maxTick: 10,
      environmentType: EnvironmentTwitter,
      metaAgentsConfigs: [agent1, agent2],
    });
    FASOW.TowerHandler.setExperimentName('Experiment-Example');
    FASOW.TowerHandler.setExperimentMaxRepetitions(2);
    FASOW.TowerHandler.setExperimentDescription('Nothing');
  }

  // eslint-disable-next-line class-methods-use-this
  createExperiment(): Experiment {
    return new ExampleExperiment();
  }
}
