import Agent from "../../fasow/abm/Agent";
import ActionRead from "../../fasow/abm/wom/custom-actions/ActionRead";
import MetaActionConfig from "../../fasow/config/metaconfig/MetaActionConfig";
import Action from "../../fasow/abm/Action";
export default class CanSaturatedActionRead extends ActionRead {
    execute(agent: Agent): void;
    createAction(actionData: MetaActionConfig): Action;
}
