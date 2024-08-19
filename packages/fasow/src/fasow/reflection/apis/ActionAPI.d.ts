import Action from "../../abm/Action";
import MetaActionConfig from "../../config/metaconfig/MetaActionConfig";
export default class ActionAPI {
    private actionConfigs;
    private actionFactories;
    constructor();
    registerNewAction(newActionType: typeof Action): void;
    registerMetaActionConfig(actionConfig: MetaActionConfig): void;
    private getAction;
    generateActionList(): Action[];
    generateActions(metaConfigs: MetaActionConfig[]): Action[];
    getMetaConfigs(): MetaActionConfig[];
    getState(): any;
}
