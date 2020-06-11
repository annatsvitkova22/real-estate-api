import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/services';
import { User } from 'src/models';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService)) private readonly userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<User> {
        const user: User = await this.userService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result }: User = user;
            
            return result;
        }

        return null;
    }

    async login(user: any): Promise<string> {
        const payload = { username: user.username };
        const accessToken: string = this.jwtService.sign(payload);

        return accessToken;
    }   
}
