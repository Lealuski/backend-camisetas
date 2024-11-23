import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'sizes'})
export class SizeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    number: string;
}