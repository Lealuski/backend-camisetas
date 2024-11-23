import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrintOrderEntity } from "./print-order.entity";

@Entity({name: 'materials'})
export class MaterialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 9, scale: 2 })
    price: number;

    @OneToMany(
        () => PrintOrderEntity,
        (print_orders: PrintOrderEntity) => print_orders.material
    )
    print_orders: PrintOrderEntity[];
}