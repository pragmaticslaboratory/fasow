import type Environment from "../../abm/Environment";
import MetaAgentConfig from "../../config/metaconfig/MetaAgentConfig";
import MetaEnvironmentConfig from "../../config/metaconfig/MetaEnvironmentConfig";
import { getTypesOfObject } from "../StructureHandler";

/*
Esta capa es el nivel siguiente de Experiment.
Dado que esta capa permite configurar escenarios aquí se encuentra una
colección de configuraciones de agentes, ambientes y acciones predefinidas
que pueden ser accedidas por la API de la capa. También se pueden configurar
nuevos escenarios o nuevos ambientes y relacionar a un conjunto de agentes
con el entorno a simular para lograr esto se utiliza a TowerHandler
para comunicar los niveles de las capas. De igual forma que en Experiment
al agregar cambios en la torre de reflexión para agregar nuevas características,
 se deben realizar cambios en este nivel de la torre si el modelo lo requiere.
 */
export default class EnvironmentAPI {
  // private environmentFactories: Map<typeof Environment, typeof Environment>;
  private scenarioConfig: any | MetaEnvironmentConfig;
  // private environmentFactories : typeof Environment[];
  private environmentFactories: Map<string, typeof Environment>;

  constructor() {
    // Setting up the environment Factories
    // this.environmentFactories = new Map<
    //   typeof Environment,
    //   IEnvironmentCreator
    // >();
    this.environmentFactories = new Map<string, typeof Environment>();
    // Setting up the scenario config.
    this.scenarioConfig = {
      metaAgentsConfigs: [],
      networkSize: 0,
      periods: 0,
      seedSize: 0,
      environmentType: undefined,
    };
  }

  /*
  Metodos para registrar clases?
   */

  registerNewEnvironment(newEnvironmentType: typeof Environment) {
    /* this.environmentFactories.set(
      newEnvironmentType,
      // @ts-ignore
      // eslint-disable-next-line new-cap
      new newEnvironmentType()
    ); */
    // if (!this.environmentFactories.has(newEnvironmentType.name)) {
      this.environmentFactories.set(
        newEnvironmentType.name,
        newEnvironmentType
      );
    // } else {
    //   throw Error(
    //    `The referenced type '${newEnvironmentType}' has really been added`
   //   );
    // }
  }

  private getEnvironment(
    environmentType: typeof Environment
  ): typeof Environment {
    if (this.environmentFactories.has(environmentType.name)) {
      // @ts-ignore
      return this.environmentFactories.get(environmentType.name);
    }
    throw Error(
      `The referenced type '${environmentType}' not exist in EnvironmentAPI`
    );
  }

  generateEnvironment(config: MetaEnvironmentConfig): Environment {
    const factoryRef = Reflect.construct(
      this.getEnvironment(config.environmentType),
      []
    );
    if (factoryRef) {
      const { createEnvironment } = factoryRef;
      return createEnvironment(config);
    }
    throw new Error(
      `Environment Type ${config.environmentType} not exist in ScenarioAPI`
    );
  }

  /*
  Metodos para configurar el scenario?
   */

  setNetworkToScenario(environment: typeof Environment) {
    this.scenarioConfig.environmentType = environment;
  }

  addAgentToScenario(agentConfig: MetaAgentConfig) {
    this.scenarioConfig.metaAgentsConfigs.push(agentConfig);
  }

  setNetworkSizeToScenario(size: number) {
    this.scenarioConfig.networkSize = size;
  }

  setPeriodsToScenario(max: number) {
    this.scenarioConfig.periods = max;
  }

  setScenarioConfig(scenarioConfig: MetaEnvironmentConfig) {
    this.scenarioConfig = scenarioConfig;
  }

  getScenarioConfig(): MetaEnvironmentConfig {
    return this.scenarioConfig;
  }

  resetScenarioConfig(): MetaEnvironmentConfig {
    this.scenarioConfig = {
      metaAgentsConfigs: [],
      networkSize: 0,
      periods: 0,
      seedSize: 0,
      environmentType: undefined,
    };
    return this.scenarioConfig;
  }

  getState(): any {
    const excludedProps = ["agents", "seeds"];
    const outputState: any[] = [];
    this.environmentFactories.forEach((type) => {
      const expectedObject = Reflect.construct(type, []);
      // console.log("Name: ", type.name);
      outputState.push({
        type: type.name,
        properties: getTypesOfObject(expectedObject, excludedProps),
      });
    });
    return outputState;
  }
}
