import Calibration from '../../abm/Calibration';
import MetaCalibrationConfig from '../../config/metaconfig/MetaCalibrationConfig';
import FASOW from '../../FASOW';
import { getTypesOfObject } from '../StructureHandler';

interface IConfigCalibrationAPI {
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
 * Calibration para luego a medida que sea necesario ir efectuando
 * estos cambios en las capas superiores de la torre de reflexion
 * haciendo uso del TowerHandler.
 */
export default class ICalibrationAPI {
  private calibrationList: Map<string, typeof Calibration>;
  private selectedCalibration!: typeof Calibration;

  private calibrationConfig: IConfigCalibrationAPI = {
    id: 0,
    name: '',
    description: '',
    maxRepetitions: -1,
  };

  constructor() {
    this.calibrationList = new Map<string, typeof Calibration>();
  }

  /* Strategy Handlers */

  registerNewCalibration(exp: typeof Calibration) {
    // todo : maybe you need to handle what happen if you try to add some calibration and that already has been added
    // if (!this.calibrationList.has(exp)) {
    this.calibrationList.set(exp.name, exp);
    //  return;
    // }
    // throw Error(
    //   `The referenced Calibration type '${exp}' has already been added`
    // );
  }

  /* Strategy Handlers */

  /* Configure Calibration */

  setCalibrationName(name: string) {
    this.calibrationConfig.name = name;
  }

  setCalibrationDescription(description: string) {
    this.calibrationConfig.description = description;
  }

  setCalibrationMaxRepetitions(maxRepetitions: number) {
    // FASOW.TowerHandler.setMaxRepetition(maxRepetitions);
    FASOW.calibration.setMaxRepetition(maxRepetitions);
    this.calibrationConfig.maxRepetitions = maxRepetitions;
  }

  /* Configure Calibration */

  getCalibrationConfig(): MetaCalibrationConfig {
    return {
      id: this.calibrationConfig.id,
      name: this.calibrationConfig.name,
      type: this.selectedCalibration,
      description: this.calibrationConfig.description,
      maxRepetitions: this.calibrationConfig.maxRepetitions,
      environmentConfig: FASOW.TowerHandler.getScenarioConfig(),
    };
  }

  createSelectedCalibration(): Calibration {
    return Reflect.construct(this.selectedCalibration, []);
  }

  selectCalibration(selected: typeof Calibration) {
    if (this.calibrationList.has(selected.name)) {
      this.selectedCalibration = selected;
      return;
    }
    throw Error(
      `The referenced type '${selected}' not exist in CalibrationAPI`,
    );
  }

  getSelectedCalibration(): typeof Calibration {
    return this.selectedCalibration;
  }

  getState(): any {
    // console.log("CalibrationAPI.state: ");

    const excludedProps: any[] = ['simulation'];
    const outputState: any[] = [];
    this.calibrationList.forEach((type) => {
      const expectedObject = Reflect.construct(type, []);
      // console.log("Name: ", type.name);
      outputState.push({
        type: type.name,
        properties: getTypesOfObject(expectedObject, excludedProps),
      });
    });
    return outputState;
  }

  selectCalibrationByName(calibration: string) {
    if (this.calibrationList.has(calibration)) {
      this.selectedCalibration = this.calibrationList.get(calibration);
      return;
    }
    throw Error(
      `The referenced type '${calibration}' not exist in CalibrationAPI`,
    );
  }
}
