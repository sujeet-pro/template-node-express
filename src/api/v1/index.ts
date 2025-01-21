import { Router } from 'express'
import { testApiRouter } from './test-api'

export const v1ApiRouter = Router()

v1ApiRouter.use('/test', testApiRouter)
