import { Controller, Get } from '@nestjs/common';

import { getEnv } from './environment';
import { Environment } from './models'

@Controller()
export class AppController {

  @Get()
  public getEnvironment(): string {
    const viewEnvironment: Environment = getEnv();
    const message = 'Environment prod: ' + viewEnvironment.production;

    return message;
  }
}
