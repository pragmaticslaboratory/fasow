import Agent from "../../../Agent";
/**
 * Pattern Subscriber or Observer interface, allow to agents to subscribe or to follow to others agents and notify some data to his followers
 */
export default interface Subject {
    /**
     * Adds an agent to the follower list to this agent
     * @param agent : Agent : The agent that will be added to the list
     */
    addFollower(agent: Agent): void;
    /**
     * Remove an agent of the followers list by his id
     * @param agentId : number : the id of the agent that will be removed
     */
    removeFollower(agentId: number): void;
    /**
     * Calls the update method of his followers sending a possible message
     */
    share(): void;
}
