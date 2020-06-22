import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

import { Order } from '../entity';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column()
    transactionId?: string;

    @OneToOne(() => Order, order => order.paymentId)
    paymentConnection?: Promise<Order[]>;
}