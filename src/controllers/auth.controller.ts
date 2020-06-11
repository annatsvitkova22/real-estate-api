
import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/services';
import { User } from 'src/models';

@Controller('api')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Request() req): Promise<any> {
        const token = this.authService.login(req.user);

        return token;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    public async getProfile(@Request() req): Promise<User> {
        return req.user;
    }
}