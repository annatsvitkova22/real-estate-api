import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { UserService } from '../services';
import { UserModel } from '../models';
import { Roles } from '../common';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('user')
    public async get(@Param() params): Promise<UserModel> {
        const user: UserModel = await this.userService.getUserById(params.id);
        
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('admin')
    public async getAll(): Promise<UserModel[]> {
        const user: UserModel[] = await this.userService.getUsers();

        return user;
    }

    @Post()
    public async create(@Body() user: any): Promise<UserModel | string> {
        const createUser: UserModel | string = await this.userService.createUser(user);

        return createUser;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('user')
    public async update(@Body() user: any): Promise<UserModel | string> {
        const updateUser: UserModel | string = await this.userService.updateUser(user);

        return updateUser;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    public async delete(@Param() params): Promise<DeleteResult | string> {
        const result: DeleteResult | string = await this.userService.deleteUser(params.id);

        return result;
    }
}
