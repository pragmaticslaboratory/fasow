import Agent from "../../abm/Agent";
export default interface EnvironmentConfig {
    id: number;
    networkSize: number;
    seedSize: number;
    currentPeriod?: number;
    initialized?: boolean;
    agents?: Agent[];
    seeds?: Agent[];
}
