import { Router } from 'express'
import { v1ApiRouter } from './v1'

export const apiRouter = Router()

apiRouter.use('/v1', v1ApiRouter)
