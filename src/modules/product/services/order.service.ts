import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { UserEntity } from '../entities/user.entity';
import { CreateOrderDto } from '../dto/create-order-dto';

@Injectable()
export class OrderService {

    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepo: Repository<OrderEntity>,

        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>,
    ) {}

    async getAll(): Promise<OrderEntity[]> {
        return await this.orderRepo.find({
            relations: {
                customer: true,
                print_orders: true,
            }
        });
    }

    async getById(idOrder: number): Promise<OrderEntity> {
        return await this.orderRepo.findOne({
            where: { id:idOrder },
            relations: {
                customer: true,
                print_orders: true,
            }
        });
    }

    async createOrder(newOrder: CreateOrderDto): Promise<OrderEntity> {
        const customerFound = await this.userRepo.findOne({
            where: {id: newOrder.customer_id}
        })
        if(!customerFound){
            throw new Error('Customer not found in creation of order');
        }

        const order = new OrderEntity();
        order.state = newOrder.state;
        order.total_net_price = newOrder.total_net_price;
        order.rating = newOrder.rating;
        order.customer = customerFound;
        return await this.orderRepo.save(order);
    }

    async updateOrder(idOrder: number, modifiedOrder: CreateOrderDto): Promise<OrderEntity> {
        const customerFound = await this.userRepo.findOne({
            where: {id: modifiedOrder.customer_id}
        })
        if(!customerFound){
            throw new Error('Customer not found in update of order');
        }

        const orderFound: OrderEntity = await this.orderRepo.findOneBy({id:idOrder});
        orderFound.state = modifiedOrder.state;
        orderFound.total_net_price = modifiedOrder.total_net_price;
        orderFound.rating = modifiedOrder.rating;
        orderFound.customer = customerFound;
        return await this.orderRepo.save(orderFound);
    }

    async deleteOrder(idOrder: number): Promise<any> {
        return await this.orderRepo.delete(idOrder);
    }

    async createOrders(newOrders: CreateOrderDto[]): Promise<OrderEntity[]> {
        const ordersToSave: OrderEntity[] = [];
        for (const newOrder of newOrders) {
            const customerFound = await this.userRepo.findOne({
                where: {id: newOrder.customer_id}
            })
            if(!customerFound){
                throw new Error('Customer not found in creation of order');
            }
            const order = new OrderEntity();
            order.state = newOrder.state;
            order.total_net_price = newOrder.total_net_price;
            order.rating = newOrder.rating;
            order.customer = customerFound;
            ordersToSave.push(order);
        }
        return this.orderRepo.save(ordersToSave);
    }    
    
    async deleteAll(): Promise<void> {
        await this.orderRepo.clear();
    }
}
