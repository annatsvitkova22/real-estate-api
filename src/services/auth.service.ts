import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthUserModel, Enviroment, UserModel, TokenModel } from '../models';
import { User } from '../entity';
import { getEnv } from '../environment';

const jwt = require('jsonwebtoken');
const envitonment: Enviroment = getEnv();
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}
    
    public async validateUser(username: string, password: string): Promise<AuthUserModel> {
        const newUser: User = {} as User;
        newUser.passwordHash = password;
        newUser.email = username;
        const user: User = await this.userRepository.findOne({ email: newUser.email });
        if (!user) {
            return null;
        }
        if (user) {
            const getPassword: boolean = await this.compareHash(newUser.passwordHash, user.passwordHash);
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
