import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Payment } from '../entity';
import { PaymentModel } from '../models';

@Injectable()
export class PaymentService {

    constructor( 
        @InjectRepository(Payment) private paymentRepository: Repository<Payment>
    ) { }

    public async getPaymentById(id: string): Promise<PaymentModel> {
        const getPayment: PaymentModel = await this.paymentRepository.findOne({
            select: ['transactionId'],
            where: [{ id: id }],
        });

        return getPayment;
    }

    public async createPayment(createPayment: PaymentModel): Promise<PaymentModel> {
        const getPayment: Payment = {} as Payment;
        getPayment.transactionId = createPayment.transactionId;
        const payment: PaymentModel = await this.paymentRepository.save(getPayment);

        return payment;
    }

    public async deletePayment(id: string): Promise<DeleteResult> {
        const result: DeleteResult = await this.paymentRepository.delete(id);
        
        return result;
    }
}
