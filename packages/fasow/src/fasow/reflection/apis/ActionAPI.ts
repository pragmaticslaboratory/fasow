import Action from "../../abm/Action";
import MetaActionConfig from "../../config/metaconfig/MetaActionConfig";
import { getTypesOfObject } from "../StructureHandler";

/*
Esta capa permite crear nuevas acciones que pueden ser ejecutadas por los agentes.
Debido al alto nivel de acoplamiento que existe entre los agentes y las acciones, ya que
un agente ejecuta acciones. Utilizamos el patrón de inversión de control para que las
acciones reciban al agente como parámetro y así permitir a esta capa que las
acciones controlen el comportamiento de los agentes. Al querer agregar nuevas
características a FASOW, los cambios llegaran hasta máximo esta capa o nivel de la torre,
de igual forma que en las capas anteriores, esta capa utiliza la API de \co{TowerHandler}
que permite una comunicación con las demás capas inferiores
 */

export default class ActionAPI {
  // private actionFactories: Map<typeof Action, IActionCreator>;
  private actionConfigs: MetaActionConfig[];
  // private actionFactories : typeof Action[];
  private actionFactories: Map<string, typeof Action>;

  constructor() {
    // this.actionFactories = new Map<typeof Action, IActionCreator>();
    this.actionConfigs = [];
    this.actionFactories = new Map<string, typeof Action>();
  }

  registerNewAction(newActionType: typeof Action) {
    // const someAction : Action = Reflect.construct(newActionType,[]);
    // this.actionFactories.set(newActionType, someAction);
    // this.actionFactories.push(newActionType)
    // if (!this.actionFactories.has(newActionType.name)) {
      this.actionFactories.set(newActionType.name, newActionType);
    // } else {
    //   throw Error(
    //     `The referenced type '${newActionType}' has really been added`
    //  );
    // }
  }

  registerMetaActionConfig(actionConfig: MetaActionConfig) {
    this.actionConfigs.push(actionConfig);
  }

  private getAction(type: typeof Action): typeof Action {
    // const actionTypeToCreate = this.actionFactories.filter(actionType => type === actionType)[0];
    // const { CreateAction } = Reflect.construct(actionTypeToCreate,[])
    if (this.actionFactories.has(type.name)) {
      // @ts-ignore
      return this.actionFactories.get(type.name);
    }
    throw Error(`The referenced type '${type}' not exist in ActionAPI`);
  }

  generateActionList(): Action[] {
    const auxList: Action[] = [];
    this.actionConfigs.forEach((actionConfig) => {
      const factoryRef = Reflect.construct(
        this.getAction(actionConfig.type),
        []
      );
      const { createAction } = factoryRef;
      auxList.push(createAction(actionConfig));
    });
    return auxList;
  }

  generateActions(metaConfigs: MetaActionConfig[]): Action[] {
    const auxList: Action[] = [];
    metaConfigs.forEach((actionConfig) => {
      const factoryRef = Reflect.construct(
        this.getAction(actionConfig.type),
        []
      );
      const { createAction } = factoryRef;
      auxList.push(createAction(actionConfig));
    });
    return auxList;
  }

  getMetaConfigs(): MetaActionConfig[] {
    const list: MetaActionConfig[] = this.actionConfigs;
    this.actionConfigs = [];
    return list;
  }

  getState(): any {
    // const excludedProps = ['followings','followers', 'actions'];
    const outputState: any[] = [];
    this.actionFactories.forEach((key) => {
      const expectedObject = Reflect.construct(key, []);
      // console.log("Name: ", key);
      outputState.push({
        type: key,
        properties: getTypesOfObject(expectedObject, []),
      });
    });

    return outputState;
  }
}
