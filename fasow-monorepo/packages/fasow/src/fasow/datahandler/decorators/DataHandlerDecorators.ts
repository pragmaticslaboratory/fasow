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

/*
todo: Encontrarle un mejor proposito a esto

export const CountAgentObjectKeysArray: CountItem[] = [];

export function AgentCount(name: string) {
  return function (target: any, propertyKey: string) {
    CountAgentObjectKeysArray.push({
      target,
      propertyKey,
      column_name: name,
    });
  };
}
 */

export const CountAgentBooleanObjectKeysArray: CountBooleanItem[] = []; // todo: this is for count agent

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
export function AgentCountBoolean(name: string, countFalse: boolean) {
  return function (target: any, propertyKey: string) {
    CountAgentBooleanObjectKeysArray.push({
      target,
      propertyKey,
      column_name: name,
      countFalse,
    });
  };
}

export const CountAgentStatesObjectKeysArray: CountStateItem[] = []; // todo : this is for state integer

/**
 * For each period, it counts all the agents whose agent.state is equal to the
 * value entered and then displays a column with the name @name in the output.
 *
 * @param name : string : The column name of the property being registered
 * @param value : number : The value that is registered as possible agent status and that will be used
 * to count the agents that have this value as status.
 */
export function AgentStateIntegerCount(name: string, value: number) {
  return function (target: any, propertyKey: string) {
    CountAgentStatesObjectKeysArray.push({
      target,
      propertyKey,
      column_name: name,
      value,
    });
  };
}

export const AccumAgentKeysArray: CountItem[] = []; // todo: this is for acum on agent

/**
 * For each period, add the values of each agent that have this property, to then display a column named @name in the output.
 * @param name : string : The column name of the property being registered.
 */
export function AccumulateAgentValue(name: string) {
  return function (target: any, propertyKey: string) {
    AccumAgentKeysArray.push({ target, propertyKey, column_name: name });
  };
}

export const AccumEnvironmentObjectKeys: CountItem[] = [];

/**
 * For each period, it adds the old values with the current value of the property for the corresponding period, to then display a column named @name in the output.
 * @param name : string : The column name of the property being registered.
 */
export function AccumulateEnvironmentValue(name: string) {
  return function (target: any, propertyKey: string) {
    AccumEnvironmentObjectKeys.push({ target, propertyKey, column_name: name });
  };
}

// todo : this is for count in environment
export const CountEnvironmentKeys: CountItem[] = [];

/**
 * For each period it records the marked parameter, and then it is recorded in the output in a column named @name
 * @param name : string : The column name of the property being registered.
 */
export function EnvironmentCount(name: string) {
  return function (target: any, propertyKey: string) {
    console.log("Name: ", name);
    console.log("propertyKey: ", propertyKey);
    console.log("target: ", target);
    CountEnvironmentKeys.push({
      target,
      propertyKey,
      column_name: name,
    });
  };
}

export const CountExperimentsKeys: CountItem[] = [];

/**
 * For each repetition it records the marked parameter, and then it is recorded in the output in a column named @name
 * @param name : string : The column name of the property being registered.
 */
export function ExperimentCount(name: string) {
  return function (target: any, propertyKey: string) {
    CountExperimentsKeys.push({
      target,
      propertyKey,
      column_name: name,
    });
  };
}
