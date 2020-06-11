import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { UserInRole } from '../entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({ length: 25 })
    name?: string;

    @OneToMany(() => UserInRole, userInRoles => userInRoles.roleId)
    roleConnection?: Promise<UserInRole[]>;
}