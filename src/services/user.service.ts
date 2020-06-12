import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { User } from '../entity';
import { UserModel } from '../models';

@Injectable()
export class UserService {
    public saltRounds = 10;
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    public async getUsers(): Promise<UserModel[]> {
        const getUsers: UserModel[] = await this.userRepository.find();

        return getUsers;
    }

    public async getUserById(id: number): Promise<UserModel> {
        const user: UserModel[] = await this.userRepository.find({
            select: ['firstName', 'lastName', 'email'],
            where: [{ id: id }],
        });

        return user[0];
    }

    public async createUser(createUser: UserModel): Promise<UserModel | string> {
        const getUser: User = {} as User;
        getUser.firstName = createUser.firstName;
        getUser.lastName = createUser.lastName;
        getUser.email = createUser.email;
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
