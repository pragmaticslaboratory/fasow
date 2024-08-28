import Experiment from "../../abm/Experiment";
import MetaExperimentConfig from "../../config/metaconfig/MetaExperimentConfig";
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
    private experimentList;
    private selectedExperiment;
    private experimentConfig;
    constructor();
    registerNewExperiment(exp: typeof Experiment): void;
    setExperimentName(name: string): void;
    setExperimentDescription(description: string): void;
    setExperimentMaxRepetitions(maxRepetitions: number): void;
    getExperimentConfig(): MetaExperimentConfig;
    createSelectedExperiment(): Experiment;
    selectExperiment(selected: typeof Experiment): void;
    getSelectedExperiment(): typeof Experiment;
    getState(): any;
    selectExperimentByName(experiment: string): void;
}
