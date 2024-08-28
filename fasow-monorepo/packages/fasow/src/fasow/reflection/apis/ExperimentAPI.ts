import ExampleExperiment from "../../../experiments/ExampleExperiment";
import { DataHandler, TimeKeeper, TowerHandler } from "../../../main";
import Experiment from "../../abm/Experiment";
import MetaExperimentConfig from "../../config/metaconfig/MetaExperimentConfig";
import { getTypesOfObject } from "../StructureHandler";

interface IConfigExperimentAPI {
  id: number;
  name: string;
  description: string;
  maxRepetitions: number;
}

/**
 * Es la capa de introduccion que permite usar un
 * lenguaje familiar para personas que trabajan en marketing
 * WOM. Al mismo tiempo ofrece un primer acceso para
 * implementar un modelo a estudiar. En esta capa se define
 * el proposito de la simulacion seleccionando a los grupos
 * de agentes que se necesitan, el ambiente que se desea y
 * se ingresa la informacion sobre como se espera realizar la
 * simulacion. Aquı se puede seleccionar una gran variedad de
 * configuraciones predefinidas, estas configuraciones o datos son
 * entregados por las capas superiores de la torre a traves del
 * uso de sus APIs asociadas. Al agregar nuevas caracterısticas
 * que requiera modificar la estructura basica de FASOW, los
 * cambios se deben realizar en primera instancia en la capa de
 * Experiment para luego a medida que sea necesario ir efectuando
 * estos cambios en las capas superiores de la torre de reflexion
 * haciendo uso del TowerHandler.
 */
export default class IExperimentAPI {
  private experimentList: Map<string, typeof Experiment>;
  private selectedExperiment!: typeof Experiment;

  private experimentConfig: IConfigExperimentAPI = {
    id: 0,
    name: "",
    description: "",
    maxRepetitions: -1,
  };

  constructor() {
    this.experimentList = new Map<string, typeof Experiment>();
  }

  /* Strategy Handlers */

  registerNewExperiment(exp: typeof Experiment) {
    // todo : maybe you need to handle what happen if you try to add some experiment and that already has been added
    // @ts-ignore
    // eslint-disable-next-line new-cap
    // if (!this.experimentList.has(exp)) {
      this.experimentList.set(exp.name, exp);
    //  return;
    // }
    // throw Error(
    //   `The referenced Experiment type '${exp}' has already been added`
    // );
  }

  /* Strategy Handlers */

  /* Configure Experiment */

  setExperimentName(name: string) {
    this.experimentConfig.name = name;
  }

  setExperimentDescription(description: string) {
    this.experimentConfig.description = description;
  }

  setExperimentMaxRepetitions(maxRepetitions: number) {
    TimeKeeper.setMaxRepetition(maxRepetitions);
    this.experimentConfig.maxRepetitions = maxRepetitions;
  }

  /* Configure Experiment */

  getExperimentConfig(): MetaExperimentConfig {
    return {
      id: this.experimentConfig.id,
      name: this.experimentConfig.name,
      type: this.selectedExperiment,
      description: this.experimentConfig.description,
      maxRepetitions: TimeKeeper.getMaxRepetition(),
      environmentConfig: TowerHandler.getScenarioConfig(),
    };
  }

  createSelectedExperiment(): Experiment {
    return Reflect.construct(this.selectedExperiment, []);
  }

  selectExperiment(selected: typeof Experiment) {
    if (this.experimentList.has(selected.name)) {
      this.selectedExperiment = selected;
      return;
    }
    throw Error(`The referenced type '${selected}' not exist in ExperimentAPI`);
  }

  getSelectedExperiment(): typeof Experiment {
    return this.selectedExperiment;
  }

  getState(): any {
    // console.log("ExperimentAPI.state: ");

    const excludedProps: any[] = ["simulation"];
    const outputState: any[] = [];
    this.experimentList.forEach((type) => {
      const expectedObject = Reflect.construct(type, []);
      // console.log("Name: ", type.name);
      outputState.push({
        type: type.name,
        properties: getTypesOfObject(expectedObject, excludedProps),
      });
    });
    return outputState;
  }

  selectExperimentByName(experiment: string) {
    if (this.experimentList.has(experiment)) {
      // @ts-ignore
      this.selectedExperiment = this.experimentList.get(experiment);
      return;
    }
    throw Error(
      `The referenced type '${experiment}' not exist in ExperimentAPI`
    );
  }
}
