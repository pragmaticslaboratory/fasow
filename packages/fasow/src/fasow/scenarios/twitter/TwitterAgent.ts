import Agent from "../../abm/Agent";
import {AgentState} from "../../abm/interfaces/Agent/AgentState";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
import {
  AgentStateIntegerCount
} from "../../datahandler/decorators/DataHandlerDecorators";

export default class TwitterAgent extends Agent {
  @AgentStateIntegerCount("NOT_READ", AgentState.NOT_READ)
  static NOT_READ : number = AgentState.NOT_READ;

  @AgentStateIntegerCount("READ", AgentState.READ)
  static READ : number = AgentState.READ;

  @AgentStateIntegerCount("READY_TO_SHARE", AgentState.READY_TO_SHARE)
  static READY : number = AgentState.READY_TO_SHARE;

  @AgentStateIntegerCount("SHARED", AgentState.SHARED)
  static SHARED : number = AgentState.SHARED;

  step(): void {
    if(this.state === TwitterAgent.READY){
      this.share();
      this.state = TwitterAgent.SHARED
    }
  }

  createAgent(id: number, agentData: MetaAgentConfig): Agent {
    return new TwitterAgent().setConfig(id, agentData);
  }

  update(message: any): any {
    this.actions.forEach((action) => action.execute(this));
    return message;
  }

}
