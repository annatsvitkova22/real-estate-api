
import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AuthController {
    constructor(

    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    public async login(@Request() req): Promise<any> {
    
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    public async getProfile(@Request() req): Promise<any> {
    }
}