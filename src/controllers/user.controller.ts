import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';

import { UserrService } from '../services';
import { UserModel } from '../models';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserrService,
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
