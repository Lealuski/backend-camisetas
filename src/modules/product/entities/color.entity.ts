import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'colors'})
export class ColorEntiy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    hexa_rgb: string;
}