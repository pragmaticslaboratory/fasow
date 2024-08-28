import Agent from "../../fasow/abm/Agent";
import ActionShare from "../../fasow/abm/wom/custom-actions/ActionShare";
import Action from "../../fasow/abm/Action";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
export default class CanSaturatedActionShare extends ActionShare {
    execute(agent: Agent): void;
    createAction(actionData: MetaActionConfig): Action;
}
