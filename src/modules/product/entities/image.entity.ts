import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrintEntity } from "./print.entity";
import { PrintOrderEntity } from "./print-order.entity";

@Entity({name: 'images'})
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    file_url: string;

    @Column()
    location: string; // FRONT or BACK or SHOULDERS

    @Column()
    sales_number: number;

    @ManyToOne(
        () => PrintEntity,
        (print: PrintEntity) => print.images,
    {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'print_id'})
    print: PrintEntity;

    @OneToMany(
        () => PrintOrderEntity,
        (front_print_orders: PrintOrderEntity) => front_print_orders.front_image
    )
    front_print_orders: PrintOrderEntity[];

    @OneToMany(
        () => PrintOrderEntity,
        (back_print_orders: PrintOrderEntity) => back_print_orders.back_image
    )
    back_print_orders: PrintOrderEntity[];

    @OneToMany(
        () => PrintOrderEntity,
        (shoulders_print_orders: PrintOrderEntity) => shoulders_print_orders.shoulders_image
    )
    shoulders_print_orders: PrintOrderEntity[];
}