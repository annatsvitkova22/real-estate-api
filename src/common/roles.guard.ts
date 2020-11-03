import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { PayloadTokenModel } from 'src/models';

const jwt = require('jsonwebtoken');

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    public canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log('roles', roles)
        if (!roles) {
            console.log('000000')
            return true;
        }
        console.log('66666')
        const ctx = GqlExecutionContext.create(context);
        let token = ctx.getContext().headers.authorization;
        token = token.substring(6, token.length).trim();
        const user: PayloadTokenModel = jwt.decode(token);
        const hasRole: boolean = roles.includes(user.role);

        
        return hasRole;
    }
}
