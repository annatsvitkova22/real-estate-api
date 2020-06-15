import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Role } from '../entity';
import { RoleModel } from '../models';

@Injectable()
export class RoleService {

    constructor( @InjectRepository(Role) private roleRepository: Repository<Role>) { }

    public async getRoles(): Promise<RoleModel[]> {
        const getRoles: RoleModel[] = await this.roleRepository.find();

        return getRoles;
    }

    public async getRoleById(id: string): Promise<RoleModel> {
        const role: RoleModel = await this.roleRepository.findOne({
            select: ['name'],
            where: [{ id: id }],
        });

        return role;
    }

    public async createRole(createRole: any): Promise<string> {
        const getRole: RoleModel = {} as RoleModel;
        getRole.name = createRole.name;
        const role: RoleModel = await this.roleRepository.save(getRole);

        return role.id;
    }

    public async updateRole(updateRole: any): Promise<RoleModel | string> {
        const getRole: RoleModel = {} as RoleModel;
        getRole.id = updateRole.id;
        getRole.name = updateRole.name;
        const toUpdate: RoleModel = await this.roleRepository.findOne(getRole.id);
        if (!toUpdate) {
            const message: string = 'role not found';

            return message;
        }

        delete toUpdate.name;
        delete getRole.id;
        const updated = Object.assign(toUpdate, getRole);
        const role: RoleModel = await this.roleRepository.save(updated);

        return role;
    }

    public async deleteRole(id: string): Promise<DeleteResult> {
        const result: DeleteResult = await this.roleRepository.delete(id);

        return result;
    }
}
