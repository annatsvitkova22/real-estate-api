import { Controller, Get, Param} from '@nestjs/common';

import { OrderService } from '../services';
import { OrderModel } from '../models';

@Controller('order')
export class OrderController {

    constructor(
        private orderService: OrderService,
        ) { }

    @Get(':id')
    public async getOrderById(@Param() params): Promise<OrderModel> {
        const order: OrderModel = await this.orderService.getOrderByUserId(params.id);

        return order;
    }

    @Get()
    public async getOrderAll(): Promise<OrderModel[]> {
        const order: OrderModel[] = await this.orderService.getOrders();

        return order;
    }
}