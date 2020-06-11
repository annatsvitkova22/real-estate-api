import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AuthController } from 'src/controllers';
import { AuthService, UserService } from 'src/services';
import { Enviroment } from 'src/models';
import { getEnv } from 'src/environment';
import { LocalStrategy, JwtStrategy } from 'src/common';

const Envitonment: Enviroment = getEnv();
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: Envitonment.tokenSecret,
      signOptions: { expiresIn: Envitonment.tokenLife },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy]
})
export class AppModule {}
