import "reflect-metadata";
interface CountItem {
    column_name: string;
    propertyKey: string;
    target: any;
}
interface CountStateItem {
    target: any;
    propertyKey: string;
    column_name: string;
    value: number;
}
interface CountBooleanItem {
    column_name: string;
    propertyKey: string;
    target: any;
    countFalse: boolean;
}
export declare const CountAgentBooleanObjectKeysArray: CountBooleanItem[];
/**
 * For each tick of the clock, it counts all the agents that have the decorated property,
 * to later display it in the output on the column with name @name. Users could count
 * false or true values according to the value of countFalse.
 *
 * @param name : string : The column name of the property being registered
 * @param countFalse : boolean : specify if the count was being to true or false values.
 *    If countFalse = true, agents with a false value will be counted
 *    If countFalse = false, agents with a true value will be counted
 */
export declare function AgentCountBoolean(name: string, countFalse: boolean): (target: any, propertyKey: string) => void;
export declare const CountAgentStatesObjectKeysArray: CountStateItem[];
/**
 * For each period, it counts all the agents whose agent.state is equal to the
 * value entered and then displays a column with the name @name in the output.
 *
 * @param name : string : The column name of the property being registered
 * @param value : number : The value that is registered as possible agent status and that will be used
 * to count the agents that have this value as status.
 */
export declare function AgentStateIntegerCount(name: string, value: number): (target: any, propertyKey: string) => void;
export declare const AccumAgentKeysArray: CountItem[];
/**
 * For each period, add the values of each agent that have this property, to then display a column named @name in the output.
 * @param name : string : The column name of the property being registered.
 */
export declare function AccumulateAgentValue(name: string): (target: any, propertyKey: string) => void;
export declare const AccumEnvironmentObjectKeys: CountItem[];
/**
 * For each period, it adds the old values with the current value of the property for the corresponding period, to then display a column named @name in the output.
 * @param name : string : The column name of the property being registered.
 */
export declare function AccumulateEnvironmentValue(name: string): (target: any, propertyKey: string) => void;
export declare const CountEnvironmentKeys: CountItem[];
/**
 * For each period it records the marked parameter, and then it is recorded in the output in a column named @name
 * @param name : string : The column name of the property being registered.
 */
export declare function EnvironmentCount(name: string): (target: any, propertyKey: string) => void;
export declare const CountExperimentsKeys: CountItem[];
/**
 * For each repetition it records the marked parameter, and then it is recorded in the output in a column named @name
 * @param name : string : The column name of the property being registered.
 */
export declare function ExperimentCount(name: string): (target: any, propertyKey: string) => void;
export {};
