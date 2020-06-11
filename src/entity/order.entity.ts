import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany} from 'typeorm';
import { User, Payment, OrderItem } from '../entity';
@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column()
    amount?: number;
    @Column()
    currency?: string;
    @Column({name: 'user_id'})
    userId?: string;
    @Column({name: 'payment_id'})
    paymentId?: string;

    @ManyToOne(() => User,  user => user.userConnection, {primary:
        true})
    @JoinColumn({name: 'user_id'})
    user?: User[];

    @OneToOne(() => Payment,  payment => payment.paymentConnection, {primary:
        true})
    @JoinColumn({name: 'payment_id'})
    payment?: Payment[];

    @OneToMany(() => OrderItem, orderItem => orderItem.orderId)
    orderItemConnection?: Promise<OrderItem[]>;
}