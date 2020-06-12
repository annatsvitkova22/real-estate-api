import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { UserService } from '../services';
import { UserModel } from '../models';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        ) { }

    @Get(':id')
    public async get(@Param() params): Promise<UserModel> {
        const user: UserModel = await this.userService.getUserById(params.id);
        
        return user;
    }

    @Get()
    public async getAll(): Promise<UserModel[]> {
        const user: UserModel[] = await this.userService.getUsers();

        return user;
    }

    @Post()
    public async create(@Body() user: any): Promise<UserModel | string> {
        const createUser: UserModel | string = await this.userService.createUser(user);

        return createUser;
    }

    @Put()
    public async update(@Body() user: any): Promise<UserModel | string> {
        const updateUser: UserModel | string = await this.userService.updateUser(user);

        return updateUser;
    }

    @Delete(':id')
    public async delete(@Param() params): Promise<DeleteResult> {
        const result: DeleteResult = await this.userService.deleteUser(params.id);

        return result;
    }
}
