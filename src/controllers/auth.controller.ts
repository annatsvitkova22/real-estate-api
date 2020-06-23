import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from '../services';
import { AuthUserModel, TokenModel, AuthModel } from '../models';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login') 
    @ApiBody({ type: AuthModel })
    @ApiCreatedResponse({ description: 'User authorization', type: TokenModel })
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
