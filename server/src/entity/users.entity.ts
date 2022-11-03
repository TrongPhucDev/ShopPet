import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
} from 'typeorm'

@Entity({ name: 'users' })
@Unique(['email'])
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    numberPhone: string

    @Column()
    address: string

    @Column({ default: 1 })
    role: number

    @Column()
    sex: string

    @Column()
    avatar: string

    @CreateDateColumn()
    createdAt: Date
}
