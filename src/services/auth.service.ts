import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');

import { AuthUserModel, Enviroment, UserModel, TokenModel, PayloadTokenModel } from '../models';
import { UserInRole } from '../entity';
import { getEnv } from '../environment';

const envitonment: Enviroment = getEnv();
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserInRole) private userInRoleRepository: Repository<UserInRole>
    ) {}
    
    public async validateUser(username: string, password: string): Promise<AuthUserModel> {
        const query: string = `SELECT "user".id, "user"."firstName", "user"."passwordHash", "user".email, "role".name FROM "user_in_role" INNER JOIN "role" ON "user_in_role".role_id = "role".id INNER JOIN "user" ON "user_in_role".user_id = "user".id WHERE "user".email = '${username}'`;

        const getUserWithRole: AuthUserModel = await this.userInRoleRepository.query(query);
        if (!getUserWithRole) {
            return null;
        }
        if (getUserWithRole) {
            const getPassword: boolean = await this.compareHash(password, getUserWithRole[0].passwordHash);
            if (getPassword) {
                const result: AuthUserModel = {} as AuthUserModel;
                result.firstName = getUserWithRole[0].firstName;
                result.userId = getUserWithRole[0].id;
                result.role = getUserWithRole[0].name;
                
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

    public async updateToken(refresh: string): Promise<TokenModel> {
        let user: PayloadTokenModel;
        jwt.verify(refresh, envitonment.tokenSecret, (err, decoded) => {
            if (err) {
                throw  new HttpException({
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'Login error, sign in',
                }, 401);
            } else {
                user = decoded;
                delete user.exp;
                delete user.iat;
            }
        });

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

    public async getRefresh(user: UserModel): Promise<string> {
        const refreshToken: string = await jwt.sign(user, envitonment.tokenSecret, { expiresIn: envitonment.refreshTokenLife });

        return refreshToken;
    }

    public async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
        const result: boolean = await bcrypt.compare(password, hash);

        return result;
    }
}
