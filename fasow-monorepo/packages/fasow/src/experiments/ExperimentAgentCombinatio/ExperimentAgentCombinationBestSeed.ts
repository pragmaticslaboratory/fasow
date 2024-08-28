import Experiment from "../../fasow/abm/Experiment";
import {TimeKeeper, TowerHandler} from "../../main";
import MetaAgentConfig from "../../fasow/config/metaconfig/MetaAgentConfig";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
import ActionRead from "../../fasow/abm/wom/custom-actions/ActionRead";
import TwitterAgent from "../../fasow/scenarios/twitter/TwitterAgent";
import ActionShare from "../../fasow/abm/wom/custom-actions/ActionShare";
import {AgentState} from "../../fasow/abm/interfaces/Agent/AgentState";
import EnvironmentTwitter from "../../fasow/scenarios/twitter/EnvironmentTwitter";
import {ExperimentCount} from "../../fasow/datahandler/decorators/DataHandlerDecorators";

export default class ExperimentAgentCombinationBestSeed extends Experiment {

    // who is the better seed ?
    // avr --> hub --> leader
    @ExperimentCount("seed-type")
    public seedType : string = "hub";
    public seedFollowerPercentage: number= 0;
    public nonSeedPercentage = 95;
    public seedPercentage = 5;

    public static getActionsConfig(type: string) : MetaActionConfig[]{
        const configRead: MetaActionConfig = {
            id: 0,
            name: "default-read",
            type: ActionRead,
            probability: 50,
        };
        switch (type) {
            case "hub":
                return [configRead, {
                    id : 1,
                    name: `read-${type}`,
                    type: ActionShare,
                    probability: 19.3,
                }]
            case "leader":
                return [configRead, {
                    id : 1,
                    name: `read-${type}`,
                    type: ActionShare,
                    probability: 25.09,
                }]
            default:
                return [configRead, {
                    id : 1,
                    name: `read-${type}`,
                    type: ActionShare,
                    probability: 19.3,
                }]
        }
    }

    Strategy(): void {
        TowerHandler.registerNewAgent(TwitterAgent);
        TowerHandler.registerNewAction(ActionRead);
        TowerHandler.registerNewAction(ActionShare);
        TowerHandler.registerNewEnvironment(EnvironmentTwitter);
        const nonSeedConfig : MetaAgentConfig = {
          id:0,
          name:"average",
            isSeed: false,
            type: TwitterAgent,
            percentage: this.nonSeedPercentage,
            state: AgentState.NOT_READ,
            followersPercentage: 0.057,
            actionsConfigs: ExperimentAgentCombinationBestSeed.getActionsConfig("average")
        };
        const seedConfig : MetaAgentConfig = {
            id: 1,
            name: "hub",
            isSeed: true,
            type: TwitterAgent,
            percentage: this.seedPercentage,
            state: AgentState.READY_TO_SHARE,
            followersPercentage: 1.14225,
            actionsConfigs: ExperimentAgentCombinationBestSeed.getActionsConfig("hub")
        }
        TowerHandler.setExperimentName(`best seed type ?`);
        TowerHandler.setExperimentDescription(
            "Who are the best seed type ?"
        );
        TowerHandler.setScenarioConfig({
            networkSize: 1000,
            maxTick: 20,
            environmentType: EnvironmentTwitter,
            metaAgentsConfigs: [nonSeedConfig, seedConfig],
        });
        TimeKeeper.setMaxRepetition(2);
    }

    createExperiment(): Experiment {
        return new ExperimentAgentCombinationBestSeed();
    }

}