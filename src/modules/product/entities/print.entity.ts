import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { ThemeEntity } from "./theme.entity";
import { ImageEntity } from "./image.entity";

@Entity({name: 'prints'})
export class PrintEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    state: string;

    @Column('text')
    description: string;

    @ManyToOne(
        () => UserEntity,
        (user: UserEntity) => user.prints,
    {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'author_id'})
    author: UserEntity;

    @ManyToOne(
        () => ThemeEntity,
        (theme: ThemeEntity) => theme.prints,
    {
        onDelete: 'RESTRICT'
    })
    @JoinColumn({name: 'theme_id'})
    theme: ThemeEntity;

    @OneToMany(
        () => ImageEntity,
        (images: ImageEntity) => images.print
    )
    images: ImageEntity[];
}