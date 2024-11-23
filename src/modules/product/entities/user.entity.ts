import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrintEntity } from "./print.entity";
import { OrderEntity } from "./order.entity";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    role: string;

    @Column()
    state: string;

    @Column()
    password: string;

    @Column()
    birthdate: Date;

    @OneToMany(
        () => PrintEntity,
        (prints: PrintEntity) => prints.author
    )
    prints: PrintEntity[];
    
    @OneToMany(
        () => OrderEntity,
        (orders: OrderEntity) => orders.customer
    )
    orders: OrderEntity[];
}