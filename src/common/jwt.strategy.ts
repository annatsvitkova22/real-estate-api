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
        console.log('44444')
        console.log('jwtFromRequest', ExtractJwt.fromAuthHeaderAsBearerToken())
    }

    public validate(payload): AuthUserModel {
        console.log('11111111')
        console.log('2222', payload)
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
