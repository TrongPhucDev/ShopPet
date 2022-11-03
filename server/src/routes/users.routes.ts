import express from 'express'
import { UsersController } from '../controllers/users.controller'
import { VerifyToken } from '../middleware/verifyToken.middleware'

const router = express.Router()
router.get('/getme/:id', VerifyToken, UsersController.GetMe)
export default router
