import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { PaymentService } from '../services';
import { PaymentModel } from '../models';

@Controller('payment')
export class PaymentController {

    constructor(
        private paymentService: PaymentService,
    ) { }

    @Get(':id')
    public async getPaymentById(@Param() params): Promise<PaymentModel> {
        const payment: PaymentModel = await this.paymentService.getPaymentById(params.id);

        return payment;
    }

    @Post()
    public async createPayment(@Body() payment: PaymentModel): Promise<PaymentModel> {
        const createdPayment: PaymentModel = await this.paymentService.createPayment(payment);

        return createdPayment;
    }

    @Delete(':id')
    public async deletePayment(@Param() params): Promise<DeleteResult> {
        const result: DeleteResult = await this.paymentService.deletePayment(params.id);

        return result;
    }
}
