import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sizes'})
export class SizeEntiy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;
}