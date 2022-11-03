import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'
export const VerifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let jwtPayload
    // const key = process.env.JWT_KEY
    //Try to validate the token and get data
    try {
        const token: string = req.cookies['access_token']
        console.log('Check token', req.cookies['access_token'])
        jwtPayload = <any>jwt.verify(token, config.get<string>('JWT_KEY'))
        res.locals.jwtPayload = jwtPayload
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send()
        return
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload
    const newToken = jwt.sign(
        { userId, username },
        config.get<string>('JWT_KEY'),
        {
            expiresIn: '1h',
        }
    )
    res.setHeader('token', newToken)

    //Call the next middleware or controller
    next()
}
