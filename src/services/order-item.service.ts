import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';

import { OrderItem, Order, Product } from '../entity';
import { OrderItemModel, OrderModel, ProductModel } from '../models';

@Injectable()
export class OrderItemService {

    constructor( 
        @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
        @InjectRepository(Order) private orderRepository: Repository<Order>,
        @InjectRepository(Product) private productRepository: Repository<Product>,
    ) { }

    public async getOrderItems(): Promise<OrderItemModel[]> {
        const getOrderItems: OrderItemModel[] = await this.orderItemRepository.find();

        return getOrderItems;
    }

    public async getOrderItemById(id: string): Promise<OrderItemModel> {
        const orderItem: OrderItemModel = await this.orderItemRepository.findOne({
            select: ['productId', 'orderId', 'time'],
            where: [{ id: id }],
        });

        return orderItem;
    }

    public async createOrderItem(createOrderItem: OrderItemModel): Promise<OrderItemModel | string> {
        const getOrderItem: OrderItem = {} as OrderItem;
        const order: Order = {} as Order;
        getOrderItem.productId = createOrderItem.productId;
        getOrderItem.time = createOrderItem.time;
        const getOrderByUserId: OrderModel = await this.orderRepository.findOne({
            select: ['id', 'userId', 'paymentId', 'amount', 'count', 'currency'],
            where: [{ userId: createOrderItem.userId, paymentId: null }],
        });
        const product: ProductModel = await this.productRepository.findOne({
            select: ['currency', 'price'],
            where: [{ id:  getOrderItem.productId }],
        });

        let updatedOrder : OrderItemModel;
        let message: string = '';

        if(!getOrderByUserId) {
            order.currency = product.currency;
            order.count = 1;
            order.amount = product.price;
            order.paymentId = null;
            order.userId = createOrderItem.userId;
            updatedOrder = await this.orderRepository.save(order);
        }
        if(getOrderByUserId) {
            if(product.currency !== getOrderByUserId.currency) {
                //logic with convert currency
            }
            if(product.currency === getOrderByUserId.currency) {
                order.amount = getOrderByUserId.amount + product.price;
            }
            order.id = getOrderByUserId.id;
            order.count = getOrderByUserId.count + 1;
            
            delete getOrderByUserId.amount;
            delete getOrderByUserId.count;
            delete getOrderByUserId.id;
            const updated: OrderItem = Object.assign(getOrderByUserId, order);
            updatedOrder = await this.orderRepository.save(updated);
        }

        if (!updatedOrder) {
            message = 'The order has not been saved'

            return message;
        }
        
        const orderItem: OrderItemModel = await this.orderItemRepository.save(getOrderItem);
        
        return orderItem;
    }

    public async deleteOrderItem(orderItemId: string): Promise<DeleteResult> {
        const result: DeleteResult = await this.orderItemRepository.delete(orderItemId);

        return result;
    }
}