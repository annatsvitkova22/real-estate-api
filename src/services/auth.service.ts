import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, ConnectionOptions, createConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthUserModel, Enviroment, UserModel, TokenModel } from '../models';
import { User, UserInRole, Role } from '../entity';
import { getEnv } from '../environment';

const jwt = require('jsonwebtoken');
const envitonment: Enviroment = getEnv();
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}
    
    public async validateUser(username: string, password: string): Promise<AuthUserModel> {

        const user: User = await this.userRepository.findOne({ email: username });
        // const query: string = `SELECT 'user.id', 'user.firstName', 'user.passwordHash', 'user.email', 'role.name' FROM user_in_role INNER JOIN role ON 'user_in_role.role_id' = 'role.id' INNER JOIN user ON 'user_in_role.user_id' = 'user.id' WHERE 'user.email' = '${username}'`;
        // const test = await createQueryBuilder("user")
        //     .innerJoinAndSelect("role", "user_in_role.role_id")
        //     .innerJoin("user", "user_in_role.user_id")
        //     .where(`"user.email" = "${username}"`)
        //     .getOne();
        // const test1 = await this.userRepository.query(query);
        // const test1 = await this.userRepository.find({
        //     join: {
        //         alias: "user_in_role",
        //         innerJoinAndSelect: {
        //             id: "user_in_role.id",
        //             user_id: "user_in_role.user_id",
        //             role_id: "user_in_role.role_id"
        //         }
        //     }
        // });
        // const test1 = await this.userRepository.query(query) 
        // console.log('test', test1);
        if (!user) {
            return null;
        }
        if (user) {
            const getPassword: boolean = await this.compareHash(password, user.passwordHash);
            if (getPassword) {
                const result: AuthUserModel = {} as AuthUserModel;
                result.firstName = user.firstName;
                result.userId = user.id;
                
                return result;
            }
        }

        return null;
    }

    public async getToken(user: UserModel): Promise<TokenModel> {
        const accessToken: string = await this.getAccess(user);
        const refreshToken: string = await this.getRefresh(user);
        const tokens: TokenModel = {
            accessToken: accessToken,
            refreshToken: refreshToken,
        };

        return tokens;
    }

    public async getAccess(user: UserModel): Promise<string> {
        const accessToken: string = await jwt.sign(user, envitonment.tokenSecret, { expiresIn: envitonment.tokenLife });

        return accessToken;
    }

    public async getRefresh(payload: UserModel): Promise<string> {
        const user: AuthUserModel = {
            userId: payload.lastName,
            username: payload.firstName,
        };
        const refreshToken: string = await jwt.sign(user, envitonment.tokenSecret, { expiresIn: envitonment.refreshTokenLife });

        return refreshToken;
    }

    public async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
        const result: boolean = await bcrypt.compare(password, hash);

        return result;
    }
}
