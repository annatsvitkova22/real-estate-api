import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PayloadTokenModel } from 'src/models';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    public canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }
        const ctx = GqlExecutionContext.create(context);
        console.log('ctx.getContext()', ctx.getContext())
        
        // const request = ctx.getContext().request;
        // console.log('request', request)
        // const Authorization = request.get('Authorization');
        // console.log('Authorization', Authorization)
        // const request = context.switchToHttp().getRequest();
        // console.log('request', request)
        // let token = request.headers.authorization;
        // token = token.substring(6, token.length).trim();
        // const jwt = require('jsonwebtoken');
        // const user: PayloadTokenModel = jwt.decode(token);
        // const hasRole: boolean = roles.includes(user.role);
        
        return true;
    }
}
