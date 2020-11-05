import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { getEnv } from '../environment';
import { Enviroment, AuthUserModel } from '../models';

const myEnvitonment: Enviroment = getEnv();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: myEnvitonment.tokenSecret,
        });
    }

    public validate(payload): AuthUserModel {
        if (payload.accessToken) {
            throw  new HttpException({
                status: HttpStatus.UNAUTHORIZED,
                error: 'This is a custom message',
            }, 401);
        }
    
        const user: AuthUserModel = { username: payload.firstName, userId: payload.userId, role: payload.role };
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
