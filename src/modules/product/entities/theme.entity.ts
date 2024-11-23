import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'themes'})
export class ThemeEntiy {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}