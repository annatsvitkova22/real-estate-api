import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderItem, User } from '../entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({ length: 25 })
    name?: string;
    @Column()
    address?: string;
    @Column()
    description?: string;
    @Column()
    status?: boolean;
    @Column()
    price?: number;
    @Column()
    currency?: string;
    @Column({name: 'user_id'})
    userId?: string;


    @OneToMany(() => OrderItem, orderItem => orderItem.productId)
    productConnection?: Promise<OrderItem[]>;

    @ManyToOne(() => User,  user => user.productConnection, {primary:
        true})
    @JoinColumn({name: 'user_id'})
    user?: User[];
}