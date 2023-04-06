import {
    BaseEntity,
    Column, CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn, UpdateDateColumn
} from "typeorm"

@Entity()
export class Url extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    url: string
    @Column()
    shortUrl: string
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updateAt: Date
}


