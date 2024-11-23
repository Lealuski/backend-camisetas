import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'colors'})
export class ColorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    hexa_rgb: string;
}