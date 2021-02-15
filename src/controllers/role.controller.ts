import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { RoleService } from '../services';
import { RoleModel } from '../models';
import { Roles } from '../common';

@ApiBearerAuth('access-token')
@ApiTags('Role')
@Controller('role')
export class RolesController {

    constructor(
        private roleService: RoleService,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('admin')
    @ApiParam({ name: 'id'})
    public async getRole(@Param() params): Promise<RoleModel> {
        const role: RoleModel = await this.roleService.getRoleById(params.id);
        
        return role;
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get()
    // @Roles('admin')
    public async getAllRole(): Promise<RoleModel[]> {
        const role: RoleModel[] = await this.roleService.getRoles();
        
        return role;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('admin')
    public async createRole(@Body() role: RoleModel): Promise<RoleModel | string> {
        const createRole: RoleModel | string = await this.roleService.createRole(role);
        
        return createRole;
    }

    @UseGuards(AuthGuard('jwt')) 
    @Put()
    @Roles('admin')
    public async updateRole(@Body() role: RoleModel): Promise<RoleModel | string> {
        const updateRole: RoleModel | string = await this.roleService.updateRole(role);
        
        return updateRole;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    @ApiParam({ name: 'id'})
    public async deleteRole(@Param() params): Promise<DeleteResult> {
        const result: DeleteResult = await this.roleService.deleteRole(params.id);
        
        return result;
    }
}
