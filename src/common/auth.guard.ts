import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { getEnv } from '../environment';
import { Enviroment } from '../models';

const jwt = require('jsonwebtoken');
const envitonment: Enviroment = getEnv();

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        let token = ctx.getContext().headers.authorization;
        token = token.substring(6, token.length).trim();
        jwt.verify(token, envitonment.tokenSecret, (err, decoded) => {
            if(err) {
                throw  new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Login error, sign in',
                }, 401);
            }
        });

        return true;
    }
}