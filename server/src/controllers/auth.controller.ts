import { Request, Response } from 'express'
import { AuthRegister, AuthLogin } from '../dto/auth.dto'
import { Users } from '../entity/users.entity'
import { AppDataSource } from '../utils/data-source'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from 'config'
export class AuthController {
    static Register = async (
        req: Request,
        res: Response
    ): Promise<AuthRegister | any> => {
        const data: AuthRegister = req.body
        try {
            const usersRepository = AppDataSource.getRepository(Users)
            const isExistsUser = await usersRepository.findOne({
                where: { email: data.email },
            })
            if (isExistsUser) res.status(401).json('User already exists')
            const hashed: string = bcrypt.hashSync(data.password, 12)
            const newUser = await usersRepository.save({
                ...data,
                password: hashed,
            })
            return res.status(200).json(newUser)
        } catch (error) {
            console.log(error)
        }
    }

    static Login = async (
        req: Request,
        res: Response
    ): Promise<Users | any> => {
        const data: AuthLogin = req.body
        // const key = process.env.JWT_KEY
        try {
            const user: Users | any = await AuthController.validateUser(
                data.email
            )
            console.log('check user', user)
            if (!user) res.status(404).json('User not found')
            const validPassword = await AuthController.validate(data, user)
            console.log('Check password', validPassword)
            if (!validPassword) res.status(403).json('Password not match')
            const token: string = jwt.sign(
                {
                    id: user!.id,
                    email: user!.email,
                    role: user!.role,
                },
                config.get<string>('JWT_KEY')
            )
            console.log('Check token:', token)
            return res
                .cookie('access_token', token, {
                    httpOnly: true,
                })
                .status(200)
                .json(user!.email)
        } catch (error) {
            console.log(error)
        }
    }

    static validateUser = async (email: string): Promise<Users | null> => {
        const usersRepository = AppDataSource.getRepository(Users)
        const user = await usersRepository.findOne({ where: { email } })
        console.log('check validate user', user)
        return user
    }

    static validate = (data: AuthLogin, user: Users): Promise<Boolean> => {
        const validatePassword = bcrypt.compare(data.password, user.password)
        return validatePassword
    }
}
