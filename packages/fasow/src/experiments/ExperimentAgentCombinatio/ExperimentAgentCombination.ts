import Experiment from "../../fasow/abm/Experiment";
import { AgentState } from "../../fasow/abm/interfaces/Agent/AgentState";
import ActionRead from "../../fasow/abm/wom/custom-actions/ActionRead";
import ActionShare from "../../fasow/abm/wom/custom-actions/ActionShare";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
import MetaAgentConfig from "../../fasow/config/metaconfig/MetaAgentConfig";
import EnvironmentTwitter from "../../fasow/scenarios/twitter/EnvironmentTwitter";
import TwitterAgent from "../../fasow/scenarios/twitter/TwitterAgent";
import { TimeKeeper, TowerHandler } from "../../main";
import { ExperimentCount } from "../../fasow/datahandler/decorators/DataHandlerDecorators";

export default class ExperimentAgentCombination extends Experiment {
  public percentageAvr: number = 95;
  public finalPercentageHub: number = 2.5;
  public finalPercentageLeader: number = 2.5;
  public seedPercentage: number = 5;

  @ExperimentCount("percentage-type") public percentageTypes: string = "";

  public static getMetaConfig(
    name: string,
    percentage: number,
    seed: boolean,
    state: number
  ): MetaAgentConfig {
    const configRead: MetaActionConfig = {
      id: 0,
      name: "default-read",
      type: ActionRead,
      probability: 50,
    };
    switch (name) {
      case "hub":
        return {
          id: 0,
          name: "hub",
          type: TwitterAgent,
          percentage,
          isSeed: seed,
          state,
          followersPercentage: 1.14225,
          actionsConfigs: [
            configRead,
            {
              id: 1,
              name: "action-share-hub",
              type: ActionShare,
              probability: 19.3,
            },
          ],
        };
      case "leader":
        return {
          id: 1,
          name: "leader",
          type: TwitterAgent,
          percentage,
          isSeed: seed,
          state,
          followersPercentage: 1.08,
          actionsConfigs: [
            configRead,
            {
              id: 1,
              name: "action-share-leader",
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
          name: "average",
          followersPercentage: 0.057,
          actionsConfigs: [
            configRead,
            {
              id: 1,
              name: "action-share-avr",
              type: ActionShare,
              probability: 19.3,
            },
          ],
        };
    }
  }

  run() {
    for (let i: number = 10; i < 100; i += 10) {
      TimeKeeper.setMaxRepetition(1);
      const percentageHubOfSeed: number = i;
      const percentageLeaderOfSeed: number = 100 - i;
      console.log("Calculating Percentages of seeds Combinations");
      console.log(
        "Hub: ",
        percentageHubOfSeed,
        "Leader: ",
        percentageLeaderOfSeed
      );
      this.finalPercentageHub = (percentageHubOfSeed * this.seedPercentage) / 100;
      this.finalPercentageLeader =
        (percentageLeaderOfSeed * this.seedPercentage) / 100;
      this.percentageAvr = 95;
      this.percentageTypes = `Hub: ${this.finalPercentageHub} Leader: ${this.finalPercentageLeader} Average: ${this.percentageAvr}`;
      console.log("Finals Agents Percentages: ");
      console.log(this.percentageTypes);
      super.run();
      TimeKeeper.resetRepetitions();
    }
  }

  Strategy(): void {
    TowerHandler.registerNewAgent(TwitterAgent);
    TowerHandler.registerNewAction(ActionRead);
    TowerHandler.registerNewAction(ActionShare);
    TowerHandler.registerNewEnvironment(EnvironmentTwitter);
    const avrConfig: MetaAgentConfig = ExperimentAgentCombination.getMetaConfig(
      "average",
      this.percentageAvr,
      false,
      AgentState.NOT_READ
    );
    const hubConfig: MetaAgentConfig = ExperimentAgentCombination.getMetaConfig(
      "hub",
      this.finalPercentageHub,
      true,
      AgentState.READY_TO_SHARE
    );
    const leaderConfig: MetaAgentConfig =
      ExperimentAgentCombination.getMetaConfig(
        "leader",
        this.finalPercentageLeader,
        true,
        AgentState.READY_TO_SHARE
      );
    TowerHandler.setExperimentName(`seed-combinations`);
    TowerHandler.setExperimentDescription(
      "Experiment to analyze what is the best agent combination to get more retweets"
    );
    TowerHandler.setScenarioConfig({
      networkSize: 10000,
      maxTick: 20,
      environmentType: EnvironmentTwitter,
      metaAgentsConfigs: [avrConfig, hubConfig, leaderConfig],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createExperiment(): Experiment {
    return new ExperimentAgentCombination();
  }
}
