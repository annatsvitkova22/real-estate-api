import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { RoleService } from '../services';
import { RoleModel } from '../models';

@Controller('role')
export class RolesController {

    constructor(
        private roleService: RoleService,
        ) { }

    @Get(':id')
    public async getRole(@Param() params): Promise<RoleModel> {
        const role: RoleModel = await this.roleService.getRoleById(params.id);
        
        return role;
    }

    @Get()
    public async getAllRole(): Promise<RoleModel[]> {
        const role: RoleModel[] = await this.roleService.getRoles();
        
        return role;
    }

    @Post()
    public async createRole(@Body() role: RoleModel): Promise<RoleModel | string> {
        const createRole: RoleModel | string = await this.roleService.createRole(role);
        
        return createRole;
    }

    @Put()
    public async updateRole(@Body() role: RoleModel): Promise<RoleModel | string> {
        const updateRole: RoleModel | string = await this.roleService.updateRole(role);
        
        return updateRole;
    }

    @Delete(':id')
    public async deleteRole(@Param() params): Promise<DeleteResult> {
        const result: DeleteResult = await this.roleService.deleteRole(params.id);
        
        return result;
    }
}
