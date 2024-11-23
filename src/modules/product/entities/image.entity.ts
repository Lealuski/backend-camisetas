import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PrintEntity } from "./print.entity";

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

}