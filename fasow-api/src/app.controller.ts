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
  @Post('run/:ExperimentName')
  runTest(@Param('ExperimentId') ExperimentId: string) {
    this.appService.selectExperiment(ExperimentId);
    this.appService.runSelectedExperiment();
    return this.appService.clearDataHandlerOutput();
  }
}
