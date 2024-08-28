import FASOW from 'src/fasow';
import Experiment from '../../fasow/fasow/abm/Experiment';
import { AgentState } from '../../fasow/fasow/abm/interfaces/Agent/AgentState';
import MetaActionConfig from '../../fasow/fasow/config/metaconfig/MetaActionConfig';
import MetaAgentConfig from '../../fasow/fasow/config/metaconfig/MetaAgentConfig';
import CanSaturatedActionRead from './CanSaturatedActionRead';
import CanSaturatedActionShare from './CanSaturatedActionShare';
import EffectAgent from './EffectAgent';
import EnvironmentEffectTwitter from './EnvironmentEffectTwitter';

export default class MessageRepetition extends Experiment {
  Strategy(): void {
    FASOW.TowerHandler.registerNewAction(CanSaturatedActionShare);
    FASOW.TowerHandler.registerNewAction(CanSaturatedActionRead);
    FASOW.TowerHandler.registerNewAgent(EffectAgent);
    FASOW.TowerHandler.registerNewEnvironment(EnvironmentEffectTwitter);

    const actionReadConfig: MetaActionConfig = {
      id: 0,
      name: 'read',
      type: CanSaturatedActionRead,
      probability: 6.3,
    };
    const actionShareConfig: MetaActionConfig = {
      id: 1,
      name: 'share',
      type: CanSaturatedActionShare,
      probability: 5,
    };
    const avrAgentConfig: MetaAgentConfig = {
      id: 0,
      followersPercentage: 0.01306,
      actionsConfigs: [actionReadConfig, actionShareConfig],
      name: 'possible saturated agent',
      type: EffectAgent,
      percentage: 95,
      state: AgentState.NOT_READ,
      isSeed: false,
    };
    const avrAgentConfigSeed: MetaAgentConfig = {
      id: 1,
      followersPercentage: 0.01306,
      actionsConfigs: [actionReadConfig, actionShareConfig],
      name: 'possible saturated agent',
      type: EffectAgent,
      percentage: 5,
      isSeed: true,
      state: AgentState.READY_TO_SHARE,
    };

    FASOW.TowerHandler.setExperimentName('Effect of Message Repetition');
    FASOW.TowerHandler.setExperimentDescription(
      'This experiment is for analyze the effect of message repetition in twitter agents on wom marketing campaings',
    );
    FASOW.TowerHandler.setScenarioConfig({
      networkSize: 10000,
      environmentType: EnvironmentEffectTwitter,
      maxTick: 40,
      metaAgentsConfigs: [avrAgentConfig, avrAgentConfigSeed],
    });
    FASOW.TimeKeeper.setMaxRepetition(1);
  }

  createExperiment(): Experiment {
    return new MessageRepetition();
  }
}
