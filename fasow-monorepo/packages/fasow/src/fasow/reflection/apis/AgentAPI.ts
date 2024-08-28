import { TowerHandler } from "../../../main";
import type Agent from "../../abm/Agent";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
import { getTypesOfObject } from "../StructureHandler";

/*
Esta capa permite crear, agrupar y combinar tipos diferentes de agentes,
también permite relacionar a los agentes con sus respectivas configuraciones
y respectivos set de posibles acciones además de establecer el orden de
ejecución de estas durante la simulación. Al igual que en las capas inferiores
al ampliar la funcionalidad de FASOW buscando querer agregar nuevas características
al modelo y si la situación lo requiere. Podemos crear nuevos agentes especializados
que pueden ser utilizados en los niveles inferiores de la arquitectura esto a través
de la API de metaprogramacion de \co{TowerHandler} que permite la comunicación.
 */
export default class AgentAPI {
  // private agentsFactories: Map<typeof Agent, IAgentCreator>;
  // private agentsFactories : typeof Agent[] = []
  private agentsFactories: Map<string, typeof Agent>;
  private agentConfigs: MetaAgentConfig[];

  constructor() {
    // this.agentsFactories = new Map<typeof Agent, IAgentCreator>();
    this.agentConfigs = [];
    this.agentsFactories = new Map<string, typeof Agent>();
  }

  registerNewAgent(type: typeof Agent) {
    // if (!this.agentsFactories.has(type.name)) {
      this.agentsFactories.set(type.name, type);
    // } else {
    //  throw Error(`The referenced type '${type}' has already been added`);
    // }
  }

  registerNewMetaAgentConfig(agentConfig: MetaAgentConfig) {
    this.agentConfigs.push(agentConfig);
  }

  registerMetaConfigs(agentConfigs: MetaAgentConfig[]) {
    this.agentConfigs = agentConfigs;
  }

  private getAgent(type: typeof Agent): typeof Agent {
    if (this.agentsFactories.has(type.name)) {
      // @ts-ignore
      return this.agentsFactories.get(type.name);
    }
    throw Error(`The referenced type '${type}' not exist in AgentAPI`);
  }

  generateAgentList(): Agent[] {
    const auxList: Agent[] = this.generateAgentsByConfigs(this.agentConfigs);
    return auxList;
  }

  generateAgentsByConfigs(metaConfigs: MetaAgentConfig[]): Agent[] {
    const auxList: Agent[] = [];
    metaConfigs.forEach((config) => {
      const quantity: number = Math.round(
        (TowerHandler.getScenarioConfig().networkSize * config.percentage) / 100
      );
      console.log(
        "Config Name: ",
        config.name,
        " Starting to creating (",
        quantity,
        ") agents with this config: \n",
        config
      );
      const { createAgent } = Reflect.construct(this.getAgent(config.type), []);
      for (let i = 0; i < quantity; i += 1) {
        auxList.push(createAgent(auxList.length, config));
      }
    });
    return auxList;
  }

  getMetaAgentConfigById(id: number) {
    return this.agentConfigs.filter((config) => config.id === id)[0];
  }

  getState(): any {
    const excludedProps = ["followings", "followers", "actions"];
    const outputState: any[] = [];
    this.agentsFactories.forEach((key) => {
      const expectedObject = Reflect.construct(key, []);
      // console.log("Name: ", key.name);
      outputState.push({
        type: key.name,
        properties: getTypesOfObject(expectedObject, excludedProps),
      });
    });
    return outputState;
  }

  // todo: a method to set the type of agent to create with an specific config
  // todo: a method to order the actions config? maybe that has to been in ActionAPI
}
