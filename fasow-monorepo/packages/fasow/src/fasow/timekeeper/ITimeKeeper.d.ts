export default class ITimeKeeper {
    private tick;
    private maxTick;
    private repetition;
    private maxRepetition;
    constructor();
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
    /**
     * Allows to set the repetition of the Experiment, this will hardly be called
     * @param repetition : number : The number that indicate the actual repetition of the experiment
     */
    setRepetition(repetition: number): void;
    /**
     * Return the Repetition of the Experiment
     */
    getRepetition(): number;
    /**
     * Updates the repetition number to +1
     */
    nextRepetition(): number;
    /**
     * Returns true if is possible to do another repetition
     */
    canNextRepetition(): boolean;
    /**
     * Allows to set the max repetitions
     * @param maxRepetitions : number : The quantity of repetitions to execute the Experiment
     */
    setMaxRepetition(maxRepetition: number): void;
    /**
     * Return the max Repetitions to do the Experiment
     */
    getMaxRepetition(): number;
    resetRepetitions(): void;
}
