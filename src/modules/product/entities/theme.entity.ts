import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PrintEntity } from "./print.entity";

@Entity({name: 'themes'})
export class ThemeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(
        () => PrintEntity,
        (prints: PrintEntity) => prints.theme
    )
    prints: PrintEntity[];
    
}