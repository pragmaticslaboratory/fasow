import MetaAgentConfig from "../../../config/metaconfig/MetaAgentConfig";
import Agent from "../../Agent";

/**
 * Factory Method pattern, allow to users to configure and personalize the creation of the agent
 */
export default interface IAgentCreator {
  /**
   * Factory Method, allow to users to configure and personalize the creation of the agent
   * @param id : number : the id to identify the agent
   * @param agentData : MetaAgentConfig : the configuration about his followers, followings, actions, initial state and if is a seed
   */
  createAgent(id: number, agentData: MetaAgentConfig): Agent;
}
