import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { PrintOrderEntity } from "./print-order.entity";

@Entity({name: 'orders'})
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    state: string;

    @Column('decimal', { precision: 12, scale: 2 })
    total_net_price: number;

    @Column('decimal', { precision: 2, scale: 1 })
    rating: number;

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.orders,
    {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'customer_id'})
    customer: UserEntity;

    @OneToMany(
        () => PrintOrderEntity,
        (print_orders: PrintOrderEntity) => print_orders.order
    )
    print_orders: PrintOrderEntity[];
}