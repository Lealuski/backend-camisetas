import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrintOrderEntity } from "./print-order.entity";

@Entity({name: 'sizes'})
export class SizeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;

    @OneToMany(
        () => PrintOrderEntity,
        (print_orders: PrintOrderEntity) => print_orders.size
    )
    print_orders: PrintOrderEntity[];
}