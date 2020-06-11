import { Injectable } from '@nestjs/common';

import { User } from '../models';

@Injectable()
export class UserService {
    private readonly users: User[];

    constructor() {
        this.users = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
        },
        {
            userId: 2,
            username: 'chris',
            password: 'secret',
        },
        {
            userId: 3,
            username: 'maria',
            password: 'guess',
        },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        const user: User = this.users.find(user => user.username === username);
        
        return user;
    }
}