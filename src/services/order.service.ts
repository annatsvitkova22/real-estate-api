import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entity';
import { OrderModel } from '../models';

@Injectable()
export class OrderService {

    constructor( @InjectRepository(Order) private orderRepository: Repository<Order>) { }

    public async getOrders(): Promise<OrderModel[]> {
        const getOrders: OrderModel[] = await this.orderRepository.find();

        return getOrders;
    }

    public async getOrderByUserId(userId: string): Promise<OrderModel> {
        const order: OrderModel = await this.orderRepository.findOne({
            select: ['id', 'amount', 'currency', 'userId', 'paymentId'],
            where: [{ userId: userId }],
        });
        
        return order;
    }
}
