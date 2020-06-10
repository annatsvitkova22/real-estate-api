import { Controller, Get, Post, Request } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { User } from './user.entity';

@Controller('api')
export class UsersController {
  constructor(

  ) { }

  @Get('users')
  public async list(@Request() req): Promise<User[]> {
    return getConnection().manager.find(User);
  }

  @Post('users')
  public async create(@Request() req): Promise<any> {
    return getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { firstName: "first", lastName: "last", password: "pass" },
      ])
      .execute();
  }
}
