import Experiment from '../../fasow/fasow/abm/Experiment';
import FASOW from '../../fasow';
import TwitterAgent from '../../fasow/fasow/scenarios/twitter/TwitterAgent';
import ActionRead from '../../fasow/fasow/abm/wom/custom-actions/ActionRead';
import ActionShare from '../../fasow/fasow/abm/wom/custom-actions/ActionShare';
import EnvironmentTwitter from '../../fasow/fasow/scenarios/twitter/EnvironmentTwitter';
import MetaAgentConfig from '../../fasow/fasow/config/metaconfig/MetaAgentConfig';
import { AgentState } from '../../fasow/fasow/abm/interfaces/Agent/AgentState';
import Action from '../../fasow/fasow/abm/Action';
import MetaActionConfig from '../../fasow/fasow/config/metaconfig/MetaActionConfig';
import Agent from '../../fasow/fasow/abm/Agent';

class TestAction extends Action {
  createAction(actionData: MetaActionConfig): Action {
    return new TestAction().setConfig(actionData);
  }

  execute(agent: Agent): void {
    agent.receiveMessage();
    console.log('TestAction specialized Behavior');
  }
}

class TestAgent extends TwitterAgent {
  /**
   * By creating new Agents we can define specialized behaviors for the users of the social network sites.
   */
}
class TestEnvironment extends EnvironmentTwitter {
  /**
   * By creating new environments we can define specialized behavior for a SocialNetworkSite.
   */
}

class TestExperiment extends Experiment {
  /**
   * Strategies on Experiments helps to define the model to implment and to configure
   * all the necessary to execute the simulation. To do this
   * we need to register the components that will being used, and setting the
   * meta experiment configuration
   */
  Strategy(): void {
    /** Registration of the Components
     * This process is important to stablish the resources required to run the simulation. And...
     * If we dont do this process, and we use some Class that it's not registered, then FASOW
     * will not recognize our specialized components
     *
     */
    FASOW.TowerHandler.registerNewAgent(TwitterAgent);
    FASOW.TowerHandler.registerNewAction(ActionRead);
    FASOW.TowerHandler.registerNewAction(ActionShare);
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentTwitter);

    // Defining and setting the Meta Experiment configuration:

    // Seeds are the agents that start the WOM communication process, so we need a configuration for them
    const seedConfig: MetaAgentConfig = {
      id: 0, // Order of creation of the agents?               //Todo: this could be improved by removing the Id ? or giving like a string IDk
      name: 'TestSharerAgentConfig', // A name to identify this configuration.
      isSeed: true, // With this we indicate that the agents that will being created with this config will be seeds.
      type: TestAgent, // Indicates the Type of agent to create with this configuration
      actionsConfigs: [
        {
          // Cada MetaActionConfig tiene un nombre, el tipo de accion, un id y una probabilidad de ser ejecutada.
          name: '1',
          type: ActionRead,
          id: 1,
          probability: 0.1,
        },
        {
          name: '1',
          type: TestAction,
          id: 1,
          probability: 0.5,
        },
        {
          name: '1',
          type: ActionShare,
          id: 1,
          probability: 0.3,
        },
      ], // Set the actions that will follows this agents
      state: AgentState.READY_TO_SHARE, // Initial state that the agents will have at the initialization of the simulation.
      followersPercentage: 0.05, // Percentage over the networkSize of agents that will have as followers these agents.
      percentage: 0.1, // Percentage of the networkSize of the total of agents that will were created.
    };

    //As we have seeds, also we will require non seeds agents to receive the message of the seeds. So we need a MetaAgentConfiguration too
    const nonSeedConfig: MetaAgentConfig = {
      id: 1, // Order of creation of the agents?
      name: 'TestReceiverAgentConfig', // A name to identify this configuration.
      isSeed: false, // With this we indicate that the agents that will being created with this config will be seeds.
      type: TestAgent, // Indicates the Type of agent to create with this configuration
      actionsConfigs: [], // Set the actions that will follows this agents
      state: AgentState.NOT_READ, // Initial state that the agents will have at the initialization of the simulation.
      followersPercentage: 0.05, // Percentage over the networkSize of agents that will have as followers these agents.
      percentage: 0.9, // Percentage of the networkSize of the total of agents that will were created.
    };

    /** Once the MetaAgentConfigurations are done we can set the ScenarioConfig
     *  where we establish the total of agents to create, the max quantity of iterations
     *  to do, the social network site to simulate, and the List of the MetaAgentsConfiguration
     *  to create on the simulation.
     *
     */

    FASOW.TowerHandler.setScenarioConfig({
      networkSize: 10000, // Total of agents that were created
      maxTick: 100, // Maximum number of steps on the simulation.
      environmentType: TestEnvironment, // The social network site to simulate
      metaAgentsConfigs: [seedConfig, nonSeedConfig],
    });

    /**
     * Finally we can define a name to this implementation of the ABM model,
     * and a description about the model to implement, and indicates the
     * number of repetitions that we will repeat the simulation for the stochastic effects
     * */

    FASOW.TowerHandler.setExperimentName('Test Experiment for Documentation '); // Set a name for the implementation
    FASOW.TowerHandler.setExperimentDescription(
      'Test Experiment Description for Documentation, ' +
        'this is an Experiment created to test the FASOW Arch and to write the FASOW Documentation.',
    ); // Add a description for our model
    FASOW.TowerHandler.setExperimentMaxRepetitions(2); // Define the repetitions for the stochastic effects
  }

  createExperiment(): Experiment {
    //This is caused for the AbstractFactory, idk what to do with this
    return new TestExperiment();
  }
}

export default TestExperiment;
