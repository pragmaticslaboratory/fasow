import MetaActionConfig from "../../../config/metaconfig/MetaActionConfig";
import type Action from "../../Action";
/**
 * Factory Method pattern, allow to users to configure and personalize the creation of the actions
 */
export default interface IActionCreator {
    /**
     * Factory Method, what allow to users to configure and personalize the creation of the actions
     * @param actionData : MetaActionConfig : The configuration of the action
     */
    createAction(actionData: MetaActionConfig): Action;
}
