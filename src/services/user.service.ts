import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { User, Role, UserInRole } from '../entity';
import { UserModel, RoleModel, UserInRoleModel } from '../models';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(UserInRole) private userInRoleRepository: Repository<UserInRole>
    ) { }

    public async getUsers(): Promise<UserModel[]> {
        const getUsers: UserModel[] = await this.userRepository.find();

        return getUsers;
    }

    public async getUserById(id: number): Promise<UserModel> {
        const user: UserModel = await this.userRepository.findOne({
            select: ['firstName', 'lastName', 'email'],
            where: [{ id: id }],
        });

        return user;
    }

    public async createUser(createUser: UserModel): Promise<UserModel | string> {
        const getUser: User = {} as User;
        getUser.firstName = createUser.firstName;
        getUser.lastName = createUser.lastName;
        getUser.email = createUser.email;
        let userRole: string = '';
        let user: UserModel = await this.userRepository.findOne({ email: getUser.email });
        if (user) {
            const message: string = 'user with this email already exists';

            return message;
        }
        
        const randomSalt = await this.getRandomSalt();
        getUser.salt = randomSalt;
        const pass = await this.getHash(createUser.password, randomSalt);
        getUser.passwordHash = pass;
        user = await this.userRepository.save(getUser);
        if (!user) {
            const message: string = 'user not created';

            return message;
        }
        if (createUser.role) {
            userRole = createUser.role;
        }
        if (!createUser.role) {
            userRole = 'user';
        }
        const findRole: RoleModel = await this.roleRepository.findOne({ name: userRole });
        let roleId: string = '';
        
        if (findRole) {
            roleId = findRole.id;
        }
        if (!findRole) {
            const role: RoleModel = {} as RoleModel;
            role.name = userRole;
            const createRole: RoleModel = await this.roleRepository.save(role);
            if (!createRole) {
                const message: string = 'role not created';
    
                return message;
            }
            console.log('createRole', createRole);
            roleId = createRole.id;
        }

        const userInRole: UserInRoleModel = {} as UserInRoleModel;
        userInRole.roleId = roleId;
        userInRole.userId = user.id;
        const createdUserInRole = await this.userInRoleRepository.save(userInRole);
        console.log('createdUserInRole', createdUserInRole);
        if (!createdUserInRole) {
            const message: string = 'user role not created';

            return message;
        }
        user.role = userRole;
        console.log('findRole', findRole);
        
        return user;
    }

    public async updateUser(updateUser: any): Promise<UserModel | string> {
        const getUser: User = {} as User;
        getUser.id = updateUser.id;
        getUser.firstName = updateUser.firstName;
        getUser.lastName = updateUser.lastName;
        getUser.passwordHash = updateUser.passwordHash;
        getUser.email = updateUser.email;
        const toUpdate: User = await this.userRepository.findOne(getUser.id);
        if(!toUpdate) {
            const message: string = 'user not found';

            return message;
        }
        delete toUpdate.firstName;
        delete toUpdate.lastName;
        delete toUpdate.passwordHash;
        delete toUpdate.email;
        delete getUser.id;
        const updated: UserModel = Object.assign(toUpdate, getUser);
        const user: UserModel = await this.userRepository.save(updated);

        return user;
    }

    public async deleteUser(userId: string): Promise<DeleteResult> {
        const result: DeleteResult = await this.userRepository.delete(userId);

        return result;
    }

    public async getRandomSalt(): Promise<string> {
        const randomSalt: string = await bcrypt.genSalt(this.saltRounds);
        
        return randomSalt;
    }

    public async getHash(password: string, randomSalt: string) {
        const result = bcrypt.hash(password, randomSalt);

        return result;
    }
}
