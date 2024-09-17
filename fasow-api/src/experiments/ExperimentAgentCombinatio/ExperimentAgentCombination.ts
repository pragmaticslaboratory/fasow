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
  public percentageAvr: number = 95;
  public finalPercentageHub: number = 2.5;
  public finalPercentageLeader: number = 2.5;
  public seedPercentage: number = 5;

  @ExperimentCount('percentage-type') public percentageTypes: string = '';

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

  Strategy(): void {
    FASOW.TowerHandler.registerNewAgent(TwitterAgent);
    FASOW.TowerHandler.registerNewAction(ActionRead);
    FASOW.TowerHandler.registerNewAction(ActionShare);
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter);
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
    FASOW.TowerHandler.setExperimentName(`seed-combinations`);
    FASOW.TowerHandler.setExperimentDescription(
      'Experiment to analyze what is the best agent combination to get more retweets',
    );
    FASOW.TowerHandler.setScenarioConfig({
      networkSize: 10000,
      maxTick: 20,
      environmentType: EnvironmentTwitter,
      metaAgentsConfigs: [avrConfig, hubConfig, leaderConfig],
    });
  }

  createExperiment(): Experiment {
    return new ExperimentAgentCombination();
  }
}
