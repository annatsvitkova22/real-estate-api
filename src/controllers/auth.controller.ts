import { Controller, Get, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiCreatedResponse } from '@nestjs/swagger';

import { AuthService } from '../services';
import { AuthUserModel, TokenModel, AuthModel, RefreshTokenModel } from '../models';

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
        const tokens: TokenModel = await this.authService.getToken(req.user);

        return tokens;
    }


    @Post('refresh') 
    @ApiBody({ type: RefreshTokenModel })
    @ApiCreatedResponse({ description: 'Validate user authorization', type: TokenModel })
    public async validate(@Body() token: RefreshTokenModel): Promise<TokenModel> {
        const tokens: TokenModel = await this.authService.updateToken(token.refreshToken);

        return tokens;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    public async getProfile(@Request() req): Promise<AuthUserModel> {

        return req.user;
    }
}
