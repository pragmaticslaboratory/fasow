import { Injectable } from '@nestjs/common';
import FASOW from '../fasow';

@Injectable()
export class AppService {
  private fasowInstance: FASOW;

  constructor() {
    this.fasowInstance = new FASOW();
  }

  getState() {
    return this.fasowInstance.getState();
  }

  runExperiment(experimentName?: string) {
    if (!experimentName) {
      this.runSelectedExperiment();
    }
    return this.fasowInstance.runExperimentByName(experimentName);
  }

  selectExperiment(experimentName: string) {
    return this.fasowInstance.selectExperimentByName(experimentName);
  }

  runSelectedExperiment() {
    return this.fasowInstance.runSelectedExperiment();
  }

  getOutput() {
    return this.fasowInstance.getOutput();
  }

  clearDataHandlerOutput() {
    return this.fasowInstance.clearDataHandlerOutput();
  }

  getLastOutputRow() {
    return this.fasowInstance.getLastOutputRow();
  }

  initializeSelectedExperiment() {
    return this.fasowInstance.initializeSelectedExperiment();
  }

  getExperimentConfig() {
    return this.fasowInstance.getExperimentConfig();
  }
}
