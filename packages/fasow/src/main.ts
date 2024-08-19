import ExperimentAgentCombination from "./experiments/ExperimentAgentCombinatio/ExperimentAgentCombination";
import ExperimentAgentCombinationBestSeed from "./experiments/ExperimentAgentCombinatio/ExperimentAgentCombinationBestSeed";
import MessageRepetition from "./experiments/ExperimentEffectMessageRepetition/MessageRepetition";
import FASOW from "./fasow/FASOW";

// FASOW es el sistema que se debe exportar el cual tiene al backend
const fasow = new FASOW();
/*
    Los siguientes tres exports corresponden a
    DataHandler : Permite generar el output y el estado del backend.
    TowerHandler : La torre de reflexion que permite controlar la arquitectura
    TimeKepper : Modulo que maneja el tiempo (ticks y repeticiones)

    Estos 3 exports son utilizados por el backend para funcionar
    y no debieran ser usados por el frontend.

 */
export const DataHandler = fasow.getDataHandler();
export const TowerHandler = fasow.getTowerHandler();
export const TimeKeeper = fasow.getTimeKeeper();

fasow.registerNewExperiment(MessageRepetition);
fasow.registerNewExperiment(ExperimentAgentCombination);
fasow.registerNewExperiment(ExperimentAgentCombinationBestSeed);
// fasow.selectExperimentByName("ExperimentAgentCombinationBestSeed");
// fasow.initializeSelectedExperiment();
// fasow.runSelectedExperiment();
// console.log(fasow.getState());

export default fasow;
