import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { User, Role } from '../entity';

@Entity()
export class UserInRole {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({name: 'role_id'})
    roleId?: string;
    @Column({name: 'user_id'})
    userId?: string;

    @ManyToOne(() => User,  user => user.userRoleConnection, {primary:
        true})
    @JoinColumn({name: 'user_id'})
    user?: User[];

    @ManyToOne(() => Role,  role => role.roleConnection, {primary:
        true})
    @JoinColumn({name: 'role_id'})
    role?: Role[];
}
