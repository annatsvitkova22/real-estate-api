import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PayloadTokenModel } from 'src/models';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    public canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        let token = request.headers.authorization;
        token = token.substring(6, token.length).trim();
        const jwt = require('jsonwebtoken');
        const user: PayloadTokenModel = jwt.decode(token);
        const hasRole: boolean = roles.includes(user.role);
        
        return hasRole;
    }
}
