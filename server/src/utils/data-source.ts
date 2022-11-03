import { Users } from '../entity/users.entity'
import { DataSource } from 'typeorm'
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'shop-pet',
    synchronize: true,
    logging: true,
    entities: [Users],
})
