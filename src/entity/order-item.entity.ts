import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Product, Order } from '../entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({name: 'product_id'})
    productId?: string;
    @Column({name: 'order_id'})
    orderId?: string;
    @Column()
    time?: Date;

    @ManyToOne(() => Product,  product => product.productConnection, {primary:
        true})
    @JoinColumn({name: 'product_id'})
    product?: Product[];

    @ManyToOne(() => Order,  order => order.orderItemConnection, {primary:
        true})
    @JoinColumn({name: 'order_id'})
    orderItem?: OrderItem[];
}
