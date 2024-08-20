import type EnvironmentConfig from "../config/config/EnvironmentConfig";
import MetaEnvironmentConfig from "../config/metaconfig/MetaEnvironmentConfig";
import Agent from "./Agent";
import type IEnvironmentCreator from "./interfaces/Environment/IEnvironmentCreator";
/**
 * Environment is the place where the simulation is executed,
 * to do this, the user need to overdrive the step and run methods
 * to specify the behavior of all the simulation.
 *
 * @method step: allow to the users to specify the behaviour of the agents during the simulation
 * @method run: handle the step by step of the simulation, calling the step method each tick of the clock and notifying the DataHandler to capture  and save a state of the simulation
 */
export default abstract class Environment implements EnvironmentConfig, IEnvironmentCreator {
    id: number;
    initialized: boolean;
    seedSize: number;
    networkSize: number;
    seeds: Agent[];
    agents: Agent[];
    constructor();
    /**
     * Allow to the user to load the Scenario config to the environment to after initializes
     * the simulation
     *
     * @param config : MetaEnvironmentConfig : establishes the quantity of agents to create,
     * sets his configurations, calculate the seedSize and registers the agentConfigs
     * in the TowerHandler at AgentAPI level.
     *
     */
    setConfig(config: MetaEnvironmentConfig): Environment;
    /**
     * Allow to users to handle what happen in each period of the running simulation
     */
    abstract step(): void;
    /**
     * Starts the simulation to being executed period per period
     * This method allow to users to introduce the behaviour of the scenario
     */
    run(): void;
    /**
     * Initializes the current environment, creating the agents, adding the followers and checking if all it's ok to run the simulation
     */
    initialize(): void;
    /**
     * Populates the list of agents of the environment according to the agent config
     * @param agentConfig the config that the agents will be based on
     */
    createAgents(): void;
    /**
     * Creates and sets the relationships between the agents,
     * adding randomly agents to the follower list for each agent
     * of the environment until complete his followers' quantity
     * given by the AgentConfig.
     */
    addFollowers(): void;
    /**
     * After the followers relationships are established, the next thing to do is load the "followings"
     * list of each agent, then, If agent A follows' agent B, then A is a follower of B, at this way
     * the "followings" relationships are established.
     */
    addFollowings(): void;
    /**
     * Check if the simulation are ready to be executed and returns true if the agents,
     * seeds, followers and followings are all set up or if exist some problem.
     */
    isDone(): boolean;
    /**
     * For each agent, his state are reset to the initial state of his MetaAgentConfig
     */
    resetAgentStates(): void;
    /**
     * For each seed, his state are reset to the initial state of his MetaAgentConfig
     */
    resetSeedStates(): void;
    /**
     * Factory Method, allow to users to configure and personalize the creation of the environment
     * @param environmentConfig : MetaEnvironmentConfig : The configuration of the scenario
     */
    abstract createEnvironment(environmentConfig: MetaEnvironmentConfig): Environment;
}
