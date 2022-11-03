import { Request, Response, NextFunction } from 'express'
import { Users } from '..//entity/users.entity'
import { AppDataSource } from '../utils/data-source'

export const CheckAuthorization = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId

    //Get user role from the database

    const usersRepository = AppDataSource.getRepository(Users)
    const user: Users | null = await usersRepository.findOne({
        where: { id: id },
    })
    if (user!.role == 0) next()
    else return res.status(403).send('You are not allowed to')
}
