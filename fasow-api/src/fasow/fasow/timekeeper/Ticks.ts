export default interface Ticks {
  tick: number;
  maxTick: number;

  /**
   * set the tick of the clock of the simulation
   * @param tick : number : unit of time of the simulation
   */
  setTick(tick: number): number;

  /**
   * returns the current tick of the clock of the simulation
   */
  getTick(): number;

  /**
   * Forces a tick update, updating is value +1 and calling the DataHandler to register the data of the simulation
   */
  nextTick(): number;

  /**
   * returns true as long as the clock Tick is less than maxTick
   */
  canNextTick(): boolean;

  /**
   * set the duration of the simulation
   * @param maxTick : number : the simulation will be executed while the tick be less than the maxTick
   */
  setMaxTick(maxTick: number): void;

  /**
   * return the duration of the simulation
   */
  getMaxTick(): number;
}
