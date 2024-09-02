import type EnvironmentConfig from '../config/config/EnvironmentConfig';
import MetaEnvironmentConfig from '../config/metaconfig/MetaEnvironmentConfig';
import FASOW from '../FASOW';
import Agent from './Agent';
import type IEnvironmentCreator from './interfaces/Environment/IEnvironmentCreator';
import Ticks from '../timekeeper/Ticks';

/**
 * Environment is the place where the simulation is executed,
 * to do this, the user need to overdrive the step and run methods
 * to specify the behavior of all the simulation.
 *
 * @method step: allow to the users to specify the behaviour of the agents during the simulation
 * @method run: handle the step by step of the simulation, calling the step method each tick of the clock and notifying the DataHandler to capture  and save a state of the simulation
 */
export default abstract class Environment
  implements EnvironmentConfig, IEnvironmentCreator, Ticks
{
  id: number;
  initialized: boolean;
  seedSize: number;
  networkSize: number;
  seeds: Agent[];
  agents: Agent[];

  constructor() {
    this.id = -1;
    this.networkSize = -1;
    this.seedSize = -1;
    this.initialized = false;
    this.agents = [];
    this.seeds = [];
    this.maxTick = -1;
    this.tick = -1;
  }

  /**
   * Allow to the user to load the Scenario config to the environment to after initializes
   * the simulation
   *
   * @param config : MetaEnvironmentConfig : establishes the quantity of agents to create,
   * sets his configurations, calculate the seedSize and registers the agentConfigs
   * in the TowerHandler at AgentAPI level.
   *
   */
  setConfig(config: MetaEnvironmentConfig): Environment {
    this.id = -1;
    this.networkSize = config.networkSize;
    let value = 0;
    config.metaAgentsConfigs.forEach((agent) => {
      if (agent.isSeed) {
        value += agent.percentage;
      }
    });
    this.seedSize = Math.round((value * this.networkSize) / 100);
    this.initialized = false;
    console.log('Setting MaxTick to --> ', config.maxTick);
    this.setMaxTick(config.maxTick);
    console.log('MaxTick is : ', this.getMaxTick());
    this.agents = [];
    this.seeds = [];
    FASOW.TowerHandler.registerMetaAgentsConfigs(config.metaAgentsConfigs);
    return this;
  }

  /**
   * Allow to users to handle what happen in each period of the running simulation
   */
  public abstract step(): void;

  /**
   * Starts the simulation to being executed period per period
   * This method allow to users to introduce the behaviour of the scenario
   */
  public run(): void {
    while (this.canNextTick()) {
      this.step();
      console.log(
        'On Step: ',
        this.nextTick(),
        ' of (',
        this.getMaxTick(),
        '): \n',
        FASOW.DataHandler.getLastOutputRow(),
      );
    }
  }

  /**
   * Initializes the current environment, creating the agents, adding the followers and checking if all it's ok to run the simulation
   */
  initialize(): void {
    console.log('On Environment Initialize');
    console.log('Agents to Create: ', this.networkSize);
    console.log('Seeds: ', this.seedSize);
    console.log('Actual Total agents quantity: ', this.agents.length);
    console.log('Actual Total seeds quantity: ', this.seeds.length);
    this.createAgents();
    console.log('Create agents passed');
    this.addFollowers();
    console.log('add followers passed');
    this.addFollowings();
    // console.log("add followings passed");

    console.log('Ending Initialization...');
    console.log('Checking...');
    console.log('Agents to Create: ', this.networkSize);
    console.log('Seeds: ', this.seedSize);
    console.log('Actual Total agents quantity: ', this.agents.length);
    console.log('Actual Total seeds quantity: ', this.seeds.length);
    if (!this.isDone()) {
      throw new Error(`Error in initialize environment with id: ${this.id}`);
    }
    this.initialized = true;
    this.setTick(0);
    console.log('All done on environment!');
  }

  /**
   * Populates the list of agents of the environment according to the agent config
   * @param agentConfig the config that the agents will be based on
   */
  createAgents(): void {
    this.agents = FASOW.TowerHandler.generateAgentList();
    this.agents.forEach((agent) => {
      if (agent.isSeed) {
        this.seeds.push(agent);
      }
    });
  }

  /**
   * Creates and sets the relationships between the agents,
   * adding randomly agents to the follower list for each agent
   * of the environment until complete his followers' quantity
   * given by the AgentConfig.
   */
  addFollowers(): void {
    this.agents.map((agent: Agent) => {
      const toRound =
        (FASOW.TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
          .followersPercentage *
          this.networkSize) /
        100;
      const total: number = Math.round(toRound);
      while (agent.followers.length !== total) {
        const max: number = this.agents.length;
        const randomIndex: number = Number.parseInt(
          `${Math.random() * (max - 1 + 1)}${0}`,
          10,
        );
        agent.addFollower(this.agents[randomIndex]);
      }
      return agent;
    });
  }

  /**
   * After the followers relationships are established, the next thing to do is load the "followings"
   * list of each agent, then, If agent A follows' agent B, then A is a follower of B, at this way
   * the "followings" relationships are established.
   */
  addFollowings(): void {
    this.agents.forEach((iAgent) => {
      iAgent.followers.forEach((kAgent) => {
        kAgent.followings.push(iAgent);
      });
    });
    /*
    This is a mind reminder
    If A is a follower of B, then
      B has A on his follower list

      and

      A has B on his followings list

      and then for each k follower of B, add B in the followings list of K
     */
  }

  /**
   * Check if the simulation are ready to be executed and returns true if the agents,
   * seeds, followers and followings are all set up or if exist some problem.
   */
  isDone() {
    if (this.agents.length !== this.networkSize) {
      throw new Error('Agents is not equal to networkSize');
    }

    if (this.seeds.length !== this.seedSize) {
      const errorMsg: string =
        `Seeds is not equal to seedSize: ` +
        `\n` +
        `seedSize: ${this.seedSize}\n` +
        `seeds.length: ${this.seeds.length}`;
      throw new Error(errorMsg);
    }

    this.agents.forEach((agent: Agent) => {
      const toRoundAgentFollowersQuantity: number =
        (FASOW.TowerHandler.getMetaAgentConfigById(agent.indexMetaAgentConfig)
          .followersPercentage *
          this.networkSize) /
        100;
      const roundedAgentFollowersQuantity: number = Math.round(
        toRoundAgentFollowersQuantity,
      );
      if (agent.followers.length !== roundedAgentFollowersQuantity) {
        throw new Error(
          `On Agent.id: ${agent.id} followers are not equal to the real number of followers`,
        );
      }
    });
    return true;
  }

  /**
   * For each agent, his state are reset to the initial state of his MetaAgentConfig
   */
  resetAgentStates(): void {
    this.agents.forEach((agent) => agent.resetState());
  }

  /**
   * For each seed, his state are reset to the initial state of his MetaAgentConfig
   */
  resetSeedStates(): void {
    this.seeds.forEach((seed) => seed.resetState());
  }

  /**
   * Factory Method, allow to users to configure and personalize the creation of the environment
   * @param environmentConfig : MetaEnvironmentConfig : The configuration of the scenario
   */
  abstract createEnvironment(
    environmentConfig: MetaEnvironmentConfig,
  ): Environment;

  maxTick: number;
  tick: number;

  /**
   * set the tick of the clock of the simulation
   * @param tick : number : unit of time of the simulation
   */
  setTick(tick: number): number {
    this.tick = tick;
    return this.tick;
  }

  /**
   * returns the current tick of the clock of the simulation
   */
  getTick(): number {
    return this.tick;
  }

  /**
   * Forces a tick update, updating is value +1 and calling the DataHandler to register the data of the simulation
   */
  nextTick(): number {
    FASOW.DataHandler.update();
    this.tick += 1;
    return this.tick;
  }

  /**
   * returns true as long as the clock Tick is less than maxTick
   */
  canNextTick(): boolean {
    return this.tick < this.maxTick;
  }

  /**
   * set the duration of the simulation
   * @param maxTick : number : the simulation will be executed while the tick be less than the maxTick
   */
  setMaxTick(maxTick: number): void {
    this.maxTick = maxTick;
  }

  /**
   * return the duration of the simulation
   */
  getMaxTick(): number {
    return this.maxTick;
  }
}
