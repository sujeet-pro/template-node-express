import { Router } from 'express'
import createHttpError from 'http-errors'

export const testApiRouter = Router()

testApiRouter.get('/not-implemented', (_req, _res, next) => {
  next(createHttpError.NotImplemented())
})

testApiRouter.get('/unauthorized', (_req, _res, next) => {
  next(createHttpError.Unauthorized())
})
