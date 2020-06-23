import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { ApiTags, ApiParam, ApiBearerAuth, ApiBody } from '@nestjs/swagger';

import { UserService } from '../services';
import { UserModel } from '../models';
import { Roles } from '../common';


@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('user')
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id'})
    public async get(@Param() params): Promise<UserModel> {
        const user: UserModel = await this.userService.getUserById(params.id);
        
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('admin')
    @ApiBearerAuth('access-token')
    public async getAll(): Promise<UserModel[]> {
        const user: UserModel[] = await this.userService.getUsers();

        return user;
    }

    @Post()
    @ApiBody({ type: UserModel })
    public async create(@Body() user: UserModel): Promise<UserModel | string> {
        const createUser: UserModel | string = await this.userService.createUser(user);

        return createUser;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put()
    @Roles('user')
    @ApiBearerAuth('access-token')
    @ApiBody({ type: UserModel })
    public async update(@Body() user: any): Promise<UserModel | string> {
        const updateUser: UserModel | string = await this.userService.updateUser(user);

        return updateUser;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    @ApiBearerAuth('access-token')
    @ApiParam({ name: 'id'})
    public async delete(@Param() params): Promise<DeleteResult | string> {
        const result: DeleteResult | string = await this.userService.deleteUser(params.id);

        return result;
    }
}
