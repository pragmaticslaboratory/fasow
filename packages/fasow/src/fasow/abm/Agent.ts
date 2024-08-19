import { TowerHandler } from "../../main";
import type AgentConfig from "../config/config/AgentConfig";
import MetaAgentConfig from "../config/metaconfig/MetaAgentConfig";
import type Action from "./Action";
import { AgentState } from "./interfaces/Agent/AgentState";
import type IAgentCreator from "./interfaces/Agent/IAgentCreator";
import Observer from "./interfaces/Agent/Observer/Observer";
import Subject from "./interfaces/Agent/Observer/Subject";

/**
 * Normally to start any WOM marketing campaign many users need to start with
 * the (NOT_READ = 0) state, for that the DEFAULT_STATE correspond
 * to (NOT_READ=0) as state
 */
const DEFAULT_STATE = AgentState.NOT_READ;

/**
 * The Agent abstract class allows to users to create different types of agents
 * like as users of somewhere social network site environment.
 * The developer should specify the behavior what the agent must follow in each
 * step, overwriting the @method step, the same with communication between
 * agents overwriting the  @method update
 */
export default abstract class Agent
  implements AgentConfig, IAgentCreator, Observer, Subject
{
  id: number;
  state?: AgentState | undefined;
  isSeed: boolean;
  actions: Action[];
  followers: Agent[];
  followings: Agent[];
  indexMetaAgentConfig: number;

  constructor() {
    this.id = -1;
    this.state = DEFAULT_STATE;
    this.isSeed = false;
    this.followers = [];
    this.followings = [];
    this.indexMetaAgentConfig = -1;
    this.actions = [];
  }

  /**
   * Allows to users to specify the behavior of the agent in each tick of the clock of the simulation
   */
  abstract step(): void;

  addFollower(agent: Agent) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agent.id) return;
    const agentIndex = this.followers.findIndex(
      (config) => config.id === agent.id
    );
    if (agentIndex === -1) {
      // add follower
      this.followers.push(agent);
    }
  }

  /**
   * Adds an agent to the followings list to this agent
   * @param agent : Agent : The agent that will be added to the list
   */
  addFollowing(agent: Agent) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agent.id) return;
    const agentIndex = this.followings.findIndex(({ id }) => id === agent.id);
    if (agentIndex === -1) {
      // add following
      this.followings.push(agent);
    }
  }

  removeFollower(agentId: number) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agentId) return;

    const agentIndex = this.followers.findIndex(({ id }) => id === agentId);
    if (agentIndex === -1) return;

    // remove follower
    this.followers.splice(agentIndex, 1);
  }

  /**
   * Remove and agent of the follower list by his id
   * @param agentId : number : the id of the agent that will be removed
   */
  removeFollowing(agentId: number) {
    // We need to make sure the agent id is not the same id of the current agent
    if (this.id === agentId) return;

    const agentIndex = this.followings.findIndex(({ id }) => id === agentId);
    if (agentIndex === -1) return;

    // remove follower
    this.followings.splice(agentIndex, 1);
  }

  /**
   * Calls and executes all the actions of the agent, the normal behavior what need to be stablishied
   * is between the use of ReadAction and then the ShareAction, this was be needed and specified adding thats actions
   * in the correct order, read and the share.
   */
  receiveMessage(): void {
    /*
      Receive Message lo unico que esta haciendo es ejecutar la lista de acc iones
    */
    this.actions.forEach((action) => {
      action.execute(this);
    });
  }

  /**
   * Sets the state of the agent in his initial state given by his MetaAgentConfig registered in the Tower Handler at the AgentAPI lvl
   */
  resetState(): void {
    this.state = TowerHandler.getMetaAgentConfigById(
      this.indexMetaAgentConfig
    ).state;
  }

  abstract createAgent(id: number, agentData: MetaAgentConfig): Agent;

  /**
   * Sets the id and the config to the agent
   * @param id : number : the id to identify the agent
   * @param agentData : MetaAgentConfig : the configuration about his followers, followings, actions, initial state and if is a seed
   */
  setConfig(id: number, config: MetaAgentConfig): Agent {
    this.id = id;
    this.isSeed = config.isSeed;
    this.followers = [];
    this.followings = [];
    this.actions = TowerHandler.generateActions(config.actionsConfigs);
    this.indexMetaAgentConfig = config.id;
    this.state = config.state;
    return this;
  }

  share(): void {
    this.followers.forEach((follower) => follower.update(this));
  }

  abstract update(message: any): any;
}
