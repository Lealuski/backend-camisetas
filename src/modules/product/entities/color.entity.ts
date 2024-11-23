import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrintOrderEntity } from "./print-order.entity";

@Entity({name: 'colors'})
export class ColorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    hexa_rgb: string;

    @OneToMany(
        () => PrintOrderEntity,
        (print_orders: PrintOrderEntity) => print_orders.color
    )
    print_orders: PrintOrderEntity[];
}