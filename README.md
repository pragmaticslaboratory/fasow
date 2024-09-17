# FASOW

FASOW is a project that contains two subprojects: `fasow-api` and `fasow-monorepo`. This repository includes both the new version of the FASOW library, exposed as an HTTP API, and the legacy library along with its client for interacting with experiments.
## Table of Contents

- [Description](#description)
- [Project Structure](#project-structure)
- [Installation & Usage](#installation)
- [FASOW Basics: Architecture Design](#fasow-architecture)
- [License](#license)

## Description

The FASOW project is divided into three main parts:

1. **fasow-api:** This folder contains the new version of the FASOW library, which has been refactored and exposed as an HTTP API. This allows the experiments and functionalities of the library to be accessed through HTTP requests.

2. **fasow-monorepo:** This subproject includes the legacy version of the FASOW library along with a client that provides the necessary interface to interact with the experiments. It is useful for maintaining compatibility with previous versions and for users who still rely on the legacy implementation. **The `fasow-monorepo` was developed with Node.js 16 and has been run with Node.js 22, but we are not sure of its correct execution.**
   
3. **fasow-ui**: This folder contains the new version of the FASOW UI that works as console to select, initialize and run models implemented on FASOW.

## Project Structure

```plaintext
FASOW/
│
├── fasow-api/                    # New version of the FASOW library exposed as an HTTP API
│   ├── .eslintrc.js              # ESLint configuration
│   ├── .prettierrc               # Prettier configuration
│   ├── fasowLoader.ts            # Main loader script that allows users to register new clases for FASOW
│   ├── nest-cli.json             # NestJS CLI configuration
│   ├── package.json              # Project dependencies and scripts
│   ├── README.md                 # Documentation specific to fasow-api
│   ├── tsconfig.build.json       # TypeScript configuration for build
│   ├── tsconfig.json             # General TypeScript configuration
│   └── src/                      # Source code for the API
│
└── fasow-monorepo/               # Legacy library and client for experiments
    ├── packages/                 # Packages and modules of the legacy library
    ├── .gitignore                # Git ignore file for unnecessary files
    ├── FASOWState.json           # State file for the legacy library
    ├── lerna.json                # Lerna configuration for the monorepo
    ├── LICENSE                   # Project license
    ├── package.json              # Dependencies and scripts for the monorepo
    ├── README.md                 # Documentation specific to fasow-monorepo
    └── yarn.lock                 # Dependency lock file for Yarn
```

## Installation

To clone the project and access its subprojects, follow these steps:

```bash
git clone https://github.com/pragmaticslaboratory/fasow.git
cd fasow
```

### Installing & Running fasow-api

```bash
cd fasow-api
npm install
npm run start:dev
```

### Installing & Running fasow-monorepo

```bash
cd fasow-monorepo
yarn install
yarn start
```

# FASOW Architecture

The FASOW architecture is based on the idea of the reflection tower, and is composed by 
3 principal modules, the `Experiment`, the `TowerHandler` and the `DataHandler`. Thus, FASOW provides us
a way to implement and create a simulation of an Agent Based model of a Word of Mouth campaign on a Social
Network Site (SNS), managing a flexible architecture easy to learn (easy to reach more users?) and an output generator.

![img_6.png](img_6.png)
# Experiment ? This could be Calibration too ? instead of experiment? I think no, because the experiment is a selected ABM model in this case.

This experiment represent a selected Agent-Based model on FASOW where we can change them, by selecting other one, initialize them to prepare FASOW to start a simulation by instantiating the required entities on the model, running it by their execution and finally get the output of each iteration and repetition time of the simulation to get the result of the simulation.

// This both modules interact laterally with the Experiment by interacting with the selected experiment on execution time, the datahandler is notified by each time on the simulation of the selected model by the use of the observer pattern, and the TowerHandler using the idea of the reflection tower allows to instantiate the required extensions of the selected model.   

# DataHandler

The DataHandler modules uses the observer pattern that where agents, environments, and experiments notifies and updates the datahandler each time where a tick or a repetition happen. So the DataHandler, that had a list of the references of all the instances of the classes that had decorated his attributs with a DataHandler decorator like: 

```typescript
//Todo: Agregar ejemplos de los diferentes decoradores de atributos que existen disponibles en fasow.

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
export function AgentCountBoolean(name: string, countFalse: boolean);

/**
 * For each period, it counts all the agents whose agent.state is equal to the
 * value entered and then displays a column with the name @name in the output.
 *
 * @param name : string : The column name of the property being registered
 * @param value : number : The value that is registered as possible agent status and that will be used
 * to count the agents that have this value as status.
 */
export function AgentStateIntegerCount(name: string, value: number);

/**
 * For each period, add the values of each agent that have this property, to then display a column named @name in the output.
 * @param name : string : The column name of the property being registered.
 */
export function AccumulateAgentValue(name: string);

/**
 * For each period, it adds the old values with the current value of the property for the corresponding period, to then display a column named @name in the output.
 * @param name : string : The column name of the property being registered.
 */
export function AccumulateEnvironmentValue(name: string);

/**
 * For each period it records the marked parameter, and then it is recorded in the output in a column named @name
 * @param name : string : The column name of the property being registered.
 */
export function EnvironmentCount(name: string);

/**
 * For each repetition it records the marked parameter, and then it is recorded in the output in a column named @name
 * @param name : string : The column name of the property being registered.
 */
export function ExperimentCount(name: string);
```

# TowerHandler

The TowerHandler is a module that allows us to encapsulate and expose the implementation of certains ABMs concerns on FASOW, by this way we can handle and manages how a class will be instatiated on execution time. Also This is module uses a Facade pattern of a more complex system of levels where each level handles a specific concern this is called the ´Reflective Tower´

//Esta parte se puede mejorar caleta pero ya es tarde hay que momir.

## Reflective Tower 

The idea of the reflection tower is present in programming languages and allow us to segment a 
software architecture by abstraction levels of different granularity. On this case, the FASOW architecture
is segmented by 4 levels (Experiment, Environment, Agent and Actions), where each one handles a specific concern of
the Agent Based Models.

### FASOW Levels

A level in FASOW is an abstraction that handles a specific concern of the ABMs and is composed principally
by three modules or more.

![img_1.png](img_1.png)

* MetaLevel API: A Metaprogramming API that exposes the implementation of the Level interface. The MetaLevel API
  provides methods to managed, define or interact with the instantiation of the particularities of the level on execution time, and provides
  the capability to register new extensions for the level. 

* MetaLevel: Is a Configuration object which communicate and connect the MetaLevelAPI with the Level Interface.
  This objects had certain information that is required to pass through the Level constructor when we will instantiate them
  on execution time.

* Level Interface: The core module of the level, that can be abstract or not, but that defines the base functionality for the level, 
  this interface is the entity that the MetaLevel Interface will instantiate on execution time.

* Extensions Level Modules: These modules are entities that extends the functionality that provides the level interface, 
  and allows to users to implements other requirements that cant be provided by the base level interface.

by this way, and by adding levels with less particularity knowledge we can start to see the Reflection Tower!
which connect and centralize all MetaInterfaces on the TowerHandler by the use of the Facade Pattern.

![img_2.png](img_2.png)

### 1. Calibration Level

The Calibration level manage the `experiments` on FASOW, that represents the model to study, implement and simulate, 
this level is composed by the `ExperimentAPI`, the `MetaExperimentConfig` and the Abstract `Experiment` class 
with his extended particularities modules.

The `Experiments` allow us to introduce the input the model and define strategy to follow during the simulation
on FASOW, however, to do that as previous step we need to register all modules that will being used on the simulation by the use of the TowerHandle.
```typescript

abstract class Experiment {
  name: string;
  description: string;
  repetition: number;
  maxRepetitions: number;
  
  strategy(): void;
  run();
  setConfig(config: MetaExperimentConfig): void;
  loadConfig(): void;
  //..getters and setters 
}
```
The `ExperimentAPI` manages the `Experiments` by handling his registration and creation, also allow us to set and change 
the configuration on the MetaExperimentConfig, which represents part of the information required to instantiate and 
initialize the model to run the simulation.
```typescript

interface IExperimentAPI {
  selectExperimentByName(experiment: string): void;
  registerNewExperiment(exp: typeof Experiment): void;
  setExperimentName(name: string): void;
  setExperimentDescription(description: string): void;
  setExperimentMaxRepetitions(maxRepetitions: number): void;
  getExperimentConfig(): MetaExperimentConfig;
  createSelectedExperiment(): Experiment;
  selectExperiment(selected: typeof Experiment): void;
  getSelectedExperiment(): typeof Experiment;
  getState(): any;
  selectExperimentByName(experiment: string): void;
}
```

The `MetaExperimentConfig` help us to define a name, a description and what to instantiate for the experiment
to simulate, and  also, we can define a number of times which the simulation will be repeated to handles the
stochastic effect.

```typescript
export default interface MetaExperimentConfig {
  // Experiment Metadata
  readonly id: number;
  name: string;
  description: string;
  type: typeof Experiment;
  maxRepetitions: number;
  // Scenario Metadata
  environmentConfig: MetaEnvironmentConfig;
}
```

### 2. Environment Level

The environment level manages the `Environments` which are the abstraction of a Social Network Site (SNS) and the simulation,
allow us to define and configure the Simulation. This level is composed by the `EnvironmentAPI`, the `MetaEnvironmentConfig`
and the Abstract `Environment`.

The `Environments` being the abstraction of the simulation and a Social Network Site, enable us to set the size of the
simulation, the types of Agents to create and his relationships, and the duration of a simulation. Also, provides
the place to define the behavior that a social network site and his users will follow.

```typescript
export default abstract class Environment implements EnvironmentConfig, IEnvironmentCreator, Ticks {
  id: number;
  initialized: boolean;
  seedSize: number;
  networkSize: number;
  seeds: Agent[];
  agents: Agent[];
  maxTick: number;
  tick: number;
  
  setConfig(config: MetaEnvironmentConfig): Environment;
  public abstract step(): void;
  public run(): void;
  initialize(): void;
  createAgents(): void;
  addFollowers(): void;
  addFollowings(): void;
  isDone(): boolean;
  resetAgentStates(): void;
  resetSeedStates(): void;
  abstract createEnvironment(environmentConfig: MetaEnvironmentConfig): Environment;
  //...getters and setters
}
```
The `MetaEnvironmentConfig` establish the configuration of the simulation like the size of agents to create, the duration 
of the simulation, the SNS to use and the configuration of the agents to instantiate.

```typescript
export default interface MetaEnvironmentConfig {
  networkSize: number;
  maxTick: number;
  environmentType: typeof Environment;
  metaAgentsConfigs: MetaAgentConfig[];
}
```

The `MetaEnvironmentAPI` manages the registration of the new Environments particularities and the configuration of the
Environment that will be created on the execution time.

```typescript
export default interface EnvironmentAPI {
  //...
  registerNewEnvironment(newEnvironmentType: typeof Environment)
  private getEnvironment(environmentType: typeof Environment): typeof Environment //Why is private ?
  generateEnvironment(config: MetaEnvironmentConfig): Environment
  setNetworkToScenario(environment: typeof Environment)
  addAgentToScenario(agentConfig: MetaAgentConfig)
  setNetworkSizeToScenario(size: number)
  setPeriodsToScenario(max: number)
  setScenarioConfig(scenarioConfig: MetaEnvironmentConfig)
  getScenarioConfig(): MetaEnvironmentConfig
  resetScenarioConfig(): MetaEnvironmentConfig
  getState(): any
}
```

### 3. Agent Level
//Todo: Describe the level as a general way, then describe the Abstract Class, The MetaConfig, and the MetaAPI

The Agent level manage the `Agents` which are the abstraction of the users of a SNS, and allow us to create new
types of agents and defining specific behaviors that they can do on the simulation, also Agents are connected with 
other Agents that they can follow, connect or subscribe to catch up some information that the other Agents
shares with his connections.

The `Agents` being the abstraction of a user of a SNS, can have followers and followings, creating connections
with other Agents, and making like a subscription with this agents, to are be available to send and receive the messages that they publish on the Network. Thus, way agents have states that are determined by some event, behavior o Action related with the Word of Mouth (WOM) communication process where they can READ a message or SHARE a message, among others... (Read more info in ``WOM Communication Process in FASOW``)

```typescript
export default abstract class Agent implements AgentConfig, IAgentCreator, Observer, Subject {
  id: number;
  state?: AgentState | undefined;
  isSeed: boolean;
  actions: Action[];
  followers: Agent[];
  followings: Agent[];
  indexMetaAgentConfig: number;
  
  abstract step(): void;
  addFollower(agent: Agent)
  addFollowing(agent: Agent)
  removeFollower(agentId: number)
  removeFollowing(agentId: number)
  receiveMessage(): void
  resetState(): void
  abstract createAgent(id: number, agentData: MetaAgentConfig): Agent;
  setConfig(id: number, config: MetaAgentConfig): Agent
  share(): void
  abstract update(message: any): any;
```

### 4. Action Level

The Action level manage the `Actions` that are behaviors that the Agents can do or not. Actions are fundamentals on the FASOW Comunication Process, because they give us the the capability to define a behavior that can modify the state of the agent that execute them and the other agents that are connected with the executor. 

We have two principal actions The READ and The SHARE action, that are logically the same, an event that depends of the state of the executor agent and an probability to happen or not. By this way we can define differents types of actions to define behaviors that addapts to our needs, to modify our agent or others.

```typescript
export default class ActionRead extends Action {
  execute(agent: Agent): void {
    const aux: TwitterAgent = <TwitterAgent>agent;
    if (aux.state === AgentState.NOT_READ) {
      const p1: number = this.getRandom();
      if (p1 > 100 - this.probability) {
        aux.state = AgentState.READ;
      }
    }
  }
}

export default class ActionShare extends Action {
  execute(agent: Agent): void {
    const aux: TwitterAgent = <TwitterAgent>agent;
    if (aux.state === AgentState.READ) {
      const p1: number = this.getRandom();
      if (p1 > 100 - this.probability) {
        aux.state = AgentState.READY_TO_SHARE;
      }
    }
  }
}
```

#### The Word of Mouth Communication Process in FASOW.

TODO: Explain this, the fasow agent states and the relation ship with the actions.

The WOM communication process in FASOW depends of the Actions and the state of the Agents, that are the following:

- NOT_READ: Indicates that the agent no have read some message and are beable to receive a message and read one.
- READ: Indicates that the agent already have read some message and thats it and now are beable to decide if SHARE or not with other the message.
- READY_TO_SHARE: Indicates that the Agent take the decision to share the message with their followers.
- SHARED: Indicates that the agent already shared a message with their followers.

With the use of this states we MAP the bassically functionality of a WOM communication process, to get a message, thinking about them, make the decision to share, and share them and by this way we can handle what an agent can do before, during and after they communicate information.

```typescript
/**
 * Enumeration of the most simply states of an Agent in a WOM communication process.
 * NOT_READ = 0,
 * READ = 1,
 * READY_TO_SHARE = 2,
 * SHARED = 3
 */
export enum AgentState {
  NOT_READ,
  READ,
  READY_TO_SHARE,
  SHARED,
}
```

## The FASOW Tower

![img_4.png](img_4.png)

## FASOW Modules
### DataHandler Decorators 

## Social Network Sites.
## Extending Behaviors

With the use of the Reflection Tower and with the Four Levels of abstraction that provides FASOW
we can extend the functionality of FASOW by the creation of:

1. **New Experiments**: To Implement a new Model to simulate on FASOW!.
2. **New Environments**: To Adding new Social Network Sites (like the Reddit Social Network) or a specific Agent management rule.
3. **New Agents**: To Adding new behaviors, logic or states that could have an Agent.
4. **New Actions**: To Adding new ways to send or receive a message or change the state of the agent in some circumstance.

Whichever will be the approach to follow, always we will have to Register this new Behavior on FASOW with the use of the TowerHandler.
```typescript
//..experiments/ExampleExperiment.ts
class ExampleExperiment extends Experiment {
  // ... other logic
  Strategy(): void {
    FASOW.TowerHandler.registerNewAgent(TwitterAgent); //Registering a new Agent on FASOW
    FASOW.TowerHandler.registerNewAction(ActionRead); //Registering a new Action on FASOW
    FASOW.TowerHandler.registerNewAction(ActionShare); //Registering a new Action on FASOW
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter); // Registering a new Action on FASOW
  }
}
```

However, the `Experiments` must be Registered on FASOW, by importing them manually and adding to the `fasowLoader.ts` file
as the following way:

```typescript
//..fasowLoader.ts
import ExperimentAgentCombination from 'src/experiments/ExperimentAgentCombinatio/ExperimentAgentCombination';
import ExperimentAgentCombinationBestSeed from 'src/experiments/ExperimentAgentCombinatio/ExperimentAgentCombinationBestSeed';
import ExampleExperiment from './experiments/ExampleExperiment';
import TestExperiment from './experiments/TestExperiment/TestExperiment';

const fasowConfig = [
  ExperimentAgentCombination,
  ExperimentAgentCombinationBestSeed,
  ExampleExperiment,
  /** Add your Experiments below to register them on FASOW**/
  TestExperiment, //Here you are registering your Experiments
];

export default fasowConfig;
```

### Extending The Experiment Level.
### Extending The Agent Level.
### Extending The Environment Level.

### Extending Action Layer.
By extending the funtionality of the action layers we can add new behaviors to handle how to send, receive
the message or change some state in the Agents by the execution of some rules. 

To do this we need to create a new `Action` that extends the `Abstract Action` like this:
```typescript
class TestAction extends Action {
  createAction(actionData: MetaActionConfig): Action {
    return new TestAction().setConfig(actionData);
  }

  execute(agent: Agent): void {
    agent.receiveMessage();
    console.log('TestAction specialized Behavior');
  }
}
```
Then we need to register this new action with the TowerHandler to allow to FASOW can use them.

```typescript
// TODO: Imports must be fixed because FASOW not exists in that path xd
import FASOW from "./FASOW";
```
Also, to maintain the FASOW logic this must be done in definition of the Strategies on the Experiments.

```typescript
import FASOW from "./FASOW";
import Experiment from "./Experiment";


class ExampleExperiment extends Experiment {
  // ... other logic
  Strategy(): void {
    FASOW.TowerHandler.registerNewAction(TestAction); // Register the new Action on the Experiment Strategy
  }
}
```




## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

