/**
 * Strategy pattern, allows to users to select some strategy, what is a mix
 * of configurations of an environment, agents and actions. The Calibrations
 * are strategies, following this, the calibrations can be selected, then
 * his configuration may being applied if previously as been defined by
 * the overwriting of the Strategy @method. Finally, the user only need to
 * call the run @method to configure and run the calibration automatically.
 */
export default interface ICalibrationStrategy {
  Strategy(): void;
}
