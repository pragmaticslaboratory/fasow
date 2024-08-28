import type AgentConfig from "../config/config/AgentConfig";
import MetaAgentConfig from "../config/metaconfig/MetaAgentConfig";
import type Action from "./Action";
import { AgentState } from "./interfaces/Agent/AgentState";
import type IAgentCreator from "./interfaces/Agent/IAgentCreator";
import Observer from "./interfaces/Agent/Observer/Observer";
import Subject from "./interfaces/Agent/Observer/Subject";
/**
 * The Agent abstract class allows to users to create different types of agents
 * like as users of somewhere social network site environment.
 * The developer should specify the behavior what the agent must follow in each
 * step, overwriting the @method step, the same with communication between
 * agents overwriting the  @method update
 */
export default abstract class Agent implements AgentConfig, IAgentCreator, Observer, Subject {
    id: number;
    state?: AgentState | undefined;
    isSeed: boolean;
    actions: Action[];
    followers: Agent[];
    followings: Agent[];
    indexMetaAgentConfig: number;
    constructor();
    /**
     * Allows to users to specify the behavior of the agent in each tick of the clock of the simulation
     */
    abstract step(): void;
    addFollower(agent: Agent): void;
    /**
     * Adds an agent to the followings list to this agent
     * @param agent : Agent : The agent that will be added to the list
     */
    addFollowing(agent: Agent): void;
    removeFollower(agentId: number): void;
    /**
     * Remove and agent of the follower list by his id
     * @param agentId : number : the id of the agent that will be removed
     */
    removeFollowing(agentId: number): void;
    /**
     * Calls and executes all the actions of the agent, the normal behavior what need to be stablishied
     * is between the use of ReadAction and then the ShareAction, this was be needed and specified adding thats actions
     * in the correct order, read and the share.
     */
    receiveMessage(): void;
    /**
     * Sets the state of the agent in his initial state given by his MetaAgentConfig registered in the Tower Handler at the AgentAPI lvl
     */
    resetState(): void;
    abstract createAgent(id: number, agentData: MetaAgentConfig): Agent;
    /**
     * Sets the id and the config to the agent
     * @param id : number : the id to identify the agent
     * @param agentData : MetaAgentConfig : the configuration about his followers, followings, actions, initial state and if is a seed
     */
    setConfig(id: number, config: MetaAgentConfig): Agent;
    share(): void;
    abstract update(message: any): any;
}
