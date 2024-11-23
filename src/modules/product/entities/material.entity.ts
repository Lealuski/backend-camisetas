import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'materials'})
export class MaterialEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 9, scale: 2 })
    price: number;

}