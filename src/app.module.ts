import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { Environment } from './models';
import { getEnv } from './environment';
import { User } from './user/user.entity';
import { UsersModule } from './user/user.module';

const Env: Environment = getEnv();

const {
  DB_PASSWORD,
  DB_USERNAME,
  DB_DATABASE_NAME,
  DB_DATABASE_HOST
} = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_DATABASE_HOST,
      port: 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE_NAME,
      entities: [User],
      synchronize: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: Env.tokenSecret,
      signOptions: { expiresIn: Env.tokenLife },
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
