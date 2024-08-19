import MetaActionConfig from "../../../config/metaconfig/MetaActionConfig";
import Action from "../../Action";
import Agent from "../../Agent";
export default class ActionRead extends Action {
    execute(agent: Agent): void;
    createAction(actionData: MetaActionConfig): Action;
}
