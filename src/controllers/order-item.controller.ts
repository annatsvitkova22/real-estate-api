import { Controller, Post, Body, Get, Put, Delete, Param} from '@nestjs/common';

import { OrderItemService } from '../services';
import { OrderItemModel } from '../models';
import { DeleteResult } from 'typeorm';

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
    public async deleteOrderItem(@Param() params): Promise<DeleteResult> {
        const result: DeleteResult = await this.orderItemService.deleteOrderItem(params.id);

        return result;
    }
}