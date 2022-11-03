import { Request, Response } from 'express'
import { Users } from '../entity/users.entity'
import { AppDataSource } from '../utils/data-source'

export class UsersController {
    static GetMe = async (
        req: Request,
        res: Response
    ): Promise<Partial<Users> | any> => {
        const paramsId: number = Number(req.params.id)
        // const data = res.locals.jwtPayload
        const userId: number = await UsersController.GetCurrentUserId(res)
        const userRepository = AppDataSource.getRepository(Users)
        try {
            if (paramsId === userId) {
                const user: Users | any = await userRepository.findOne({
                    where: { id: paramsId },
                })
                res.status(200).json(user)
                return user
            }
        } catch (error) {
            console.log(error)
        }
    }

    static GetCurrentUserId = async (res: Response): Promise<Users['id']> => {
        const userId: number = Number(res.locals.jwtPayload.id)
        if (!userId) res.status(401).json('User id is required, Please Login!')
        return userId
    }
}
