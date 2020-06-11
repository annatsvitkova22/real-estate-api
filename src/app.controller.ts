import { Controller, Get } from '@nestjs/common';

import { getEnv } from './environment';
import { Enviroment } from './models';

@Controller()
export class AppController {

  @Get()
  public getEnvironment(): string {
    const viewEnvironment: Enviroment = getEnv();
    const message = 'Environment prod: ' + viewEnvironment.production;

    return message;
  }
}
