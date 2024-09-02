export default interface Repetitions {
  repetition: number;
  maxRepetition: number;

  setRepetition(repetition: number): void;
  getRepetition(): number;
  nextRepetition(): number;
  canNextRepetition(): boolean;
  setMaxRepetition(maxRepetition: number): void;
  getMaxRepetition(): number;
  resetRepetitions();
}
