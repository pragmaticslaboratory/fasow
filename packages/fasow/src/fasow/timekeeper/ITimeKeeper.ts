import { DataHandler } from "../../main";

/*
Es la capa n ́ucleo y la capa m ́as alta de la
arquitectura reflexiva de FASOW. Esta capa permite el control
del tiempo y es la que permite que los agentes ejecuten sus
acciones de manera correcta, esta capa no posee una API para
modificar los par ́ametros internos de la capa, pero si posee
m ́etodos para servir de informaci ́on a las capas inferiores como
por ejemplo para obtener el tick actual de la simulaci ́on.
 */
export default class ITimeKeeper {
  private tick: number;
  private maxTick: number;

  private repetition: number;
  private maxRepetition: number;

  constructor() {
    this.maxTick = -1;
    this.tick = -1;

    this.repetition = -1;
    this.maxRepetition = -1;
  }

  /**
   * set the tick of the clock of the simulation
   * @param tick : number : unit of time of the simulation
   */
  setTick(tick: number): number {
    this.tick = tick;
    return this.tick;
  }

  /**
   * returns the current tick of the clock of the simulation
   */
  getTick(): number {
    return this.tick;
  }

  /**
   * Forces a tick update, updating is value +1 and calling the DataHandler to register the data of the simulation
   */
  nextTick(): number {
    DataHandler.update();
    this.tick += 1;
    return this.tick;
  }

  /**
   * returns true as long as the clock Tick is less than maxTick
   */
  canNextTick(): boolean {
    return this.tick < this.maxTick;
  }

  /**
   * set the duration of the simulation
   * @param maxTick : number : the simulation will be executed while the tick be less than the maxTick
   */
  setMaxTick(maxTick: number): void {
    this.maxTick = maxTick;
  }

  /**
   * return the duration of the simulation
   */
  getMaxTick(): number {
    return this.maxTick;
  }

  /**
   * Allows to set the repetition of the Experiment, this will hardly be called
   * @param repetition : number : The number that indicate the actual repetition of the experiment
   */
  setRepetition(repetition: number) {
    this.repetition = repetition;
  }

  /**
   * Return the Repetition of the Experiment
   */
  getRepetition(): number {
    return this.repetition;
  }

  /**
   * Updates the repetition number to +1
   */
  nextRepetition(): number {
    this.repetition += 1;
    return this.repetition;
  }

  /**
   * Returns true if is possible to do another repetition
   */
  canNextRepetition(): boolean {
    return this.repetition < this.maxRepetition;
  }

  /**
   * Allows to set the max repetitions
   * @param maxRepetitions : number : The quantity of repetitions to execute the Experiment
   */
  setMaxRepetition(maxRepetition: number): void {
    this.maxRepetition = maxRepetition;
  }

  /**
   * Return the max Repetitions to do the Experiment
   */
  getMaxRepetition(): number {
    return this.maxRepetition;
  }

  resetRepetitions() {
    this.repetition = -1;
  }
}
