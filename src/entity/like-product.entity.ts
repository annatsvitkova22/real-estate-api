import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Product, User } from '../entity';

@Entity()
export class LikeProduct {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({name: 'product_id'})
    productId?: string;
    @Column({name: 'user_id'})
    userId?: string;

    @ManyToOne(() => Product,  product => product.productConnection, {primary:
        true})
    @JoinColumn({name: 'product_id'})
    product?: Product[];

    @ManyToOne(() => User,  user => user.userConnection, {primary:
        true})
    @JoinColumn({name: 'user_id'})
    user?: User[];
}
