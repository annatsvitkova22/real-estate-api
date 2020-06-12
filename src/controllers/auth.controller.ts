import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services';
import { AuthUserModel, TokenModel } from '../models';

@Controller('api')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Request() req): Promise<TokenModel> {
        const token: TokenModel = await this.authService.getToken(req.user);

        return token;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    public async getProfile(@Request() req): Promise<AuthUserModel> {
        return req.user;
    }
}
