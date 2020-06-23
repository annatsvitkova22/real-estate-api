import { Controller, Post, Body, Get, Delete, Param, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';
import { ApiTags, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { OrderItemService } from '../services';
import { OrderItemModel } from '../models';
import { Roles } from '../common';

@ApiBearerAuth('access-token')
@ApiTags('OrderItem')
@Controller('orderItem')
export class OrderItemsController {

    constructor(
        private orderItemService: OrderItemService,
        ) { }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    @Roles('user')
    @ApiParam({ name: 'id'})
    public async getOrderItemById(@Param() params): Promise<OrderItemModel> {
        const orderItem: OrderItemModel = await this.orderItemService.getOrderItemById(params.id);

        return orderItem;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Roles('user')
    public async getOrderItemAll(): Promise<OrderItemModel[]> {
        const orderItem: OrderItemModel[] = await this.orderItemService.getOrderItems();

        return orderItem;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Roles('user')
    public async createOrderItem(@Body() orderItem: OrderItemModel): Promise<OrderItemModel | string> {
        const createdOrderItem: OrderItemModel | string = await this.orderItemService.createOrderItem(orderItem);

        return createdOrderItem;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    @Roles('user')
    @ApiParam({ name: 'id'})
    public async deleteOrderItem(@Param() params): Promise<DeleteResult | string> {
        const result: DeleteResult | string = await this.orderItemService.deleteOrderItem(params.id);

        return result;
    }
}
