import { Controller, Post, Body, Get, Delete, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

import { PaymentService } from '../services';
import { PaymentModel } from '../models';
import { Roles } from '../common';

@Controller('payment')
export class PaymentController {

    constructor(
        private paymentService: PaymentService,
    ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('admin')
    public async getPaymentById(@Param() params): Promise<PaymentModel> {
        const payment: PaymentModel = await this.paymentService.getPaymentById(params.id);

        return payment;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('user')
    public async createPayment(@Body() payment: PaymentModel): Promise<PaymentModel | string> {
        const createdPayment: PaymentModel | string = await this.paymentService.createPayment(payment);

        return createdPayment;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('admin')
    public async deletePayment(@Param() params): Promise<DeleteResult | string> {
        const result: DeleteResult | string = await this.paymentService.deletePayment(params.id);

        return result;
    }
}
