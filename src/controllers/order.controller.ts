import { Controller, Get, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { OrderService } from '../services';
import { OrderModel } from '../models';
import { Roles } from '../common';

@Controller('order')
export class OrderController {

    constructor(
        private orderService: OrderService,
        ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('admin')
    public async getOrderById(@Param() params): Promise<OrderModel> {
        const order: OrderModel = await this.orderService.getOrderByUserId(params.id);

        return order;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('admin')
    public async getOrderAll(): Promise<OrderModel[]> {
        const order: OrderModel[] = await this.orderService.getOrders();

        return order;
    }
}