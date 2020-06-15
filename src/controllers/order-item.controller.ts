import { Controller, Post, Body, Get, Delete, Param} from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { OrderItemService } from '../services';
import { OrderItemModel } from '../models';

@Controller('orderItem')
export class OrderItemsController {

    constructor(
        private orderItemService: OrderItemService,
        ) { }

    @Get(':id')
    public async getOrderItemById(@Param() params): Promise<OrderItemModel> {
        const orderItem: OrderItemModel = await this.orderItemService.getOrderItemById(params.id);

        return orderItem;
    }

    @Get()
    public async getOrderItemAll(): Promise<OrderItemModel[]> {
        const orderItem: OrderItemModel[] = await this.orderItemService.getOrderItems();

        return orderItem;
    }

    @Post()
    public async createOrderItem(@Body() orderItem: OrderItemModel): Promise<OrderItemModel | string> {
        const createdOrderItem: OrderItemModel | string = await this.orderItemService.createOrderItem(orderItem);

        return createdOrderItem;
    }

    @Delete(':id')
    public async deleteOrderItem(@Param() params): Promise<DeleteResult | string> {
        const result: DeleteResult | string = await this.orderItemService.deleteOrderItem(params.id);

        return result;
    }
}