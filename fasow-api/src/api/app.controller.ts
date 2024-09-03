import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('fasow/api/v2')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('run')
  run() {
    this.appService.runExperiment();
    return this.appService.clearDataHandlerOutput();
  }

  @ApiParam({
    name: 'ExperimentId',
    type: String,
    example: 'ExampleExperiment',
  })
  @Post('select/:ExperimentId')
  select(@Param('ExperimentId') ExperimentId: string) {
    console.log('selectExperiment: ', ExperimentId);
    return this.appService.selectExperiment(ExperimentId);
  }

  @Get('getState')
  getState() {
    return this.appService.getState();
  }

  @ApiParam({
    example: 'ExampleExperiment',
    type: String,
    name: 'ExperimentId',
  })
  @Post('run/:ExperimentId')
  runTest(@Param('ExperimentId') ExperimentId: string) {
    this.appService.selectExperiment(ExperimentId);
    this.appService.runSelectedExperiment();
    return this.appService.clearDataHandlerOutput();
  }

  @Get('getSelectedExperimentConfig')
  getSelectedExperimentConfig() {
    //Todo: Maybe replace the undefined for nulls, because if the response had undefined, then that response key will be removed instead of been returned with null value
    const selectedExperimentConfig = this.appService.getExperimentConfig();
    console.log('getSelectedExperimentConfig: ', selectedExperimentConfig);
    return selectedExperimentConfig;
  }
}
