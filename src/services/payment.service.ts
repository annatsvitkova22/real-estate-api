import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Payment, Order } from '../entity';
import { PaymentModel, OrderModel, Enviroment, StripeModel } from '../models';
import { getEnv } from 'src/environment';

const Envitonment: Enviroment = getEnv();
@Injectable()
export class PaymentService {

    constructor( 
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
    ) { }

    public async getPaymentById(id: string): Promise<PaymentModel> {
        const getPayment: PaymentModel = await this.paymentRepository.findOne({
            select: ['transactionId'],
            where: [{ id: id }],
        });

        return getPayment;
    }

    public async createPayment(createPayment: PaymentModel): Promise<PaymentModel | string> {
        const getPayment: Payment = {} as Payment;
        const order: OrderModel = await this.orderRepository.findOne({
            where: [{ id: createPayment.orderId }]
        })

        if (!order) {
            const message: string = 'order not found';

            return message;
        }
        
        const transactionId: StripeModel = await this.charge(createPayment);
        console.log('transactionId', transactionId)
        getPayment.transactionId = transactionId.id;
        console.log('getPayment', getPayment);
        const payment: PaymentModel = await this.paymentRepository.save(getPayment);
        console.log('payment', payment);
        if(!payment) {
            const message: string = 'payment was not saved';

            return message;
        }
        const newOrder: Order = {} as Order;
        newOrder.paymentId = payment.id;
        delete order.paymentId;
        const updated: Order = Object.assign(newOrder, order);
        const updatedOrder: Order = await this.orderRepository.save(updated);
        if(!updatedOrder) {
            const message: string = 'payment is not attached to the order';

            return message;
        }

        return payment;
    }

    public async deletePayment(id: string): Promise<DeleteResult | string> {
        const order: OrderModel = await this.orderRepository.findOne({
            where: [{ transactionId: id }]
        })
        const newOrder: Order = {} as Order;
        newOrder.paymentId = null;
        delete order.paymentId;
        const updated: Order = Object.assign(newOrder, order);
        const updatedOrder: Order = await this.orderRepository.save(updated);
        if(!updatedOrder) {
            const message: string = 'payment id is not delete in the order';

            return message;
        }
        const result: DeleteResult = await this.paymentRepository.delete(id);
        
        return result;
    }

    public async charge(payment: PaymentModel): Promise<StripeModel> {
        const stripe = require('stripe')(Envitonment.stripeApiKey);
        const customer = await stripe.customers.create({
            email: payment.email,
            source: payment.source,
        });
        const charge = await stripe.charges.create({
            amount: payment.amount,
            currency: payment.currency,
            customer: customer.id,
        });

        if (charge.status === 'succeeded') {
            const balanceTransactionId: StripeModel = {
                id:  charge.id,
                status: charge.status
            };

            return balanceTransactionId;
        }
        const message: StripeModel = {
            status: charge.status,
            message: 'Error'
        }
        return message;
    }
}
