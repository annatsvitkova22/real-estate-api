import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { Order, OrderItem } from '../entity';
import { OrderModel } from '../models';

@Injectable()
export class OrderService {

    constructor( 
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
    ) { }

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

    public async deleteOrderByUser(userId: string): Promise<boolean | string> {
        const ordersByUserId: Order[] = await this.orderRepository.find({
            where: [{userId: userId}]
        });
        if (ordersByUserId) {
            ordersByUserId.forEach(async orderByUserId => {
                const orderItemsByOrderId: OrderItem[] = await this.orderItemRepository.find({
                    where: [{orderId: orderByUserId.id}]
                });
                if(orderItemsByOrderId) {
                    orderItemsByOrderId.forEach(async orderItemByOrderId => {
                        const deletedOrderItem: DeleteResult = await this.orderItemRepository.delete(orderItemByOrderId.id);
                        if(!deletedOrderItem.affected) {
                            const message: string = 'removal not completed, try again';
            
                            return message;
                        }
                    });
                }
                const deletedOrder: DeleteResult = await this.orderRepository.delete(orderByUserId.id);
                if(!deletedOrder.affected) {
                    const message: string = 'removal not completed, try again';
    
                    return message;
                }
            });
        }
        return true;
    }
}
