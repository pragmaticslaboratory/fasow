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

export default class ExperimentAgentCombinationBestSeed extends Experiment {
  // who is the better seed ?
  // avr --> hub --> leader
  @ExperimentCount('seed-type')
  public seedType: string = 'hub';
  public seedFollowerPercentage: number = 0;
  public nonSeedPercentage = 95;
  public seedPercentage = 5;

  public static getActionsConfig(type: string): MetaActionConfig[] {
    const configRead: MetaActionConfig = {
      id: 0,
      name: 'default-read',
      type: ActionRead,
      probability: 50,
    };
    switch (type) {
      case 'hub':
        return [
          configRead,
          {
            id: 1,
            name: `read-${type}`,
            type: ActionShare,
            probability: 19.3,
          },
        ];
      case 'leader':
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

  Strategy(): void {
    // Registration of the used components.
    FASOW.TowerHandler.registerNewAgent(TwitterAgent);
    FASOW.TowerHandler.registerNewAction(ActionRead);
    FASOW.TowerHandler.registerNewAction(ActionShare);
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter);

    // Defining The MetaExperimentConfiguration.
    const nonSeedConfig: MetaAgentConfig = {
      id: 0,
      name: 'average',
      isSeed: false,
      type: TwitterAgent,
      percentage: this.nonSeedPercentage,
      state: AgentState.NOT_READ,
      followersPercentage: 0.057,
      actionsConfigs:
        ExperimentAgentCombinationBestSeed.getActionsConfig('average'),
    };
    const seedConfig: MetaAgentConfig = {
      id: 1,
      name: 'hub',
      isSeed: true,
      type: TwitterAgent,
      percentage: this.seedPercentage,
      state: AgentState.READY_TO_SHARE,
      followersPercentage: 1.14225,
      actionsConfigs:
        ExperimentAgentCombinationBestSeed.getActionsConfig('hub'),
    };
    FASOW.TowerHandler.setExperimentName(`best seed type ?`);
    FASOW.TowerHandler.setExperimentDescription('Who are the best seed type ?');
    FASOW.TowerHandler.setScenarioConfig({
      networkSize: 1000,
      maxTick: 20,
      environmentType: EnvironmentTwitter,
      metaAgentsConfigs: [nonSeedConfig, seedConfig],
    });
    FASOW.TimeKeeper.setMaxRepetition(2);
  }

  createExperiment(): Experiment {
    return new ExperimentAgentCombinationBestSeed();
  }
}
