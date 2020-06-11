import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Order, UserInRole, Product } from '../entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({ length: 25 })
    firstName?: string;
    @Column()
    lastName?: string;
    @Column()
    passwordHash?: string;
    @Column()
    email?: string;
    @Column()
    salt?: string;

    @OneToMany(() => Order, order => order.userId)
    userConnection?: Promise<Order[]>;

    @OneToMany(() => UserInRole, userInRole => userInRole.userId)
    userRoleConnection?: Promise<UserInRole[]>;

    @OneToMany(() => Product, product => product.userId)
    productConnection?: Promise<Product[]>;
}