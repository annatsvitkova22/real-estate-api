import { Controller, Get } from '@nestjs/common';

import { getEnv } from 'src/environment';
import { Enviroment } from 'src/models';

@Controller()
export class AppController {

  @Get()
  public getEnvironment(): string {
    const viewEnvironment: Enviroment = getEnv();
    const message = 'Enviroment prod: ' + viewEnvironment.production;

    return message;
  }
}
