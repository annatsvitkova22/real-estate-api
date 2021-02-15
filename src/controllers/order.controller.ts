import { Controller, Get, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { OrderService } from '../services';
import { OrderModel } from '../models';
import { Roles } from '../common';

@ApiBearerAuth('access-token')
@ApiTags('Order')
@Controller('order')
export class OrderController {

    constructor(
        private orderService: OrderService,
        ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('admin')
    @ApiParam({ name: 'id'})
    public async getOrderById(@Param() params): Promise<OrderModel> {
        const order: OrderModel = await this.orderService.getOrderByUserId(params.id);

        return order;
    }

    // @UseGuards(AuthGuard('jwt'))
    @Get()
    // @Roles('admin')
    public async getOrderAll(): Promise<OrderModel[]> {
        const order: OrderModel[] = await this.orderService.getOrders();

        return order;
    }
}