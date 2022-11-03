import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { AppDataSource } from './utils/data-source'
import usersRoutes from './routes/users.routes'
import authRoutes from './routes/auth.routes'
dotenv.config()

AppDataSource.initialize()
    .then(() => {
        const app = express()
        app.use(express.json())
        app.use(bodyParser.json({ limit: '30mb' }))
        app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
        app.use(cors({ origin: true }))
        app.use(cookieParser())
        app.use('/api/users', usersRoutes)
        app.use('/api/auth', authRoutes)
        const Port: number | string = process.env.PORT || 5000
        app.listen(Port, () => console.log(`Server id running on port ${5000}`))
    })
    .catch((err) => console.log(err))
