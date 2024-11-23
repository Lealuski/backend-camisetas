import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'themes'})
export class ThemeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}