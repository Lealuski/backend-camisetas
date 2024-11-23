import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SizeEntity } from "./size.entity";
import { ImageEntity } from "./image.entity";
import { ColorEntity } from "./color.entity";
import { MaterialEntity } from "./material.entity";
import { OrderEntity } from "./order.entity";

@Entity({name: 'print_orders'})
export class PrintOrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 8, scale: 2 })
    gross_price: number;

    @Column()
    amount: number;

    @ManyToOne(
        () => ImageEntity,
        (front_image: ImageEntity) => front_image.front_print_orders,
    {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name: 'front_image_id'})
    front_image: ImageEntity;

    @ManyToOne(
        () => ImageEntity,
        (back_image: ImageEntity) => back_image.back_print_orders,
    {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name: 'back_image_id'})
    back_image: ImageEntity;

    @ManyToOne(
        () => ImageEntity,
        (shoulders_image: ImageEntity) => shoulders_image.shoulders_print_orders,
    {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name: 'shoulders_image_id'})
    shoulders_image: ImageEntity;

    @ManyToOne(
        () => SizeEntity,
        (size: SizeEntity) => size.print_orders,
    {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name: 'size_id'})
    size: SizeEntity;

    @ManyToOne(
        () => ColorEntity,
        (color: ColorEntity) => color.print_orders,
    {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name: 'color_id'})
    color: ColorEntity;

    @ManyToOne(
        () => MaterialEntity,
        (material: MaterialEntity) => material.print_orders,
    {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name: 'material_id'})
    material: MaterialEntity;

    @ManyToOne(
        () => OrderEntity,
        (order: OrderEntity) => order.print_orders,
    {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name: 'order_id'})
    order: OrderEntity;

}