import ActionConfig from "../config/config/ActionConfig";
import MetaActionConfig from "../config/metaconfig/MetaActionConfig";
import type Agent from "./Agent";
import type IActionCreator from "./interfaces/Action/IActionCreator";
/**
 * The Action abstract class allow to users to build specialized actions.
 * For that the developer should overwrite the @methods "execute" and
 * "createAction". Normally an action should have a probability to be executed
 * or a probability to change something in the Agent, like the state of this.
 */
export default abstract class Action implements ActionConfig, IActionCreator {
    name: string;
    probability: number;
    idMetaActionConfig: number;
    constructor();
    /**
     * The user should to specify an algorithm or behavior of the execution of this action,
     * this maybe can be described as "Execute actionRead in agent given as @param, what means,
     * calculates the probability to Read and if this is satisfied, then change the state
     * of the agent to (READ=1)."
     * @param agent : Agent : The agent what is being executing the action.
     */
    abstract execute(agent: Agent): void;
    getRandom(): number;
    /**
     * Sets the configuration of an action setting his probability, name and saving his MetaActionConfig reference
     * @param actionConfig : MetaActionConfig : The configuration of the action to be set
     */
    setConfig(actionConfig: MetaActionConfig): Action;
    abstract createAction(actionData: MetaActionConfig): Action;
}
