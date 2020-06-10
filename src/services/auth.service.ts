import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService)) private readonly userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;

            return result;
        }
        return null;
    }

    async login(user: any): Promise<string> {
        const payload = { username: user.username, sub: user.userId };
        const access_token = this.jwtService.sign(payload);

        return access_token;
    }
}
