import Action from "../../abm/Action";
import Agent from "../../abm/Agent";
import { AgentState } from "../../abm/interfaces/Agent/AgentState";

export default interface AgentConfig {
  readonly id: number;
  state?: AgentState;
  isSeed: boolean;
  actions: Action[];
  followers: Agent[];
  followings: Agent[];
  readonly indexMetaAgentConfig: number;
}
