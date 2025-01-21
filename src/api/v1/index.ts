import { auth } from '@/middleware/auth.middleware'
import { Router } from 'express'
import { samplesAuthRoutes } from './samples/auth.route'
import { samplesProtectedRoutes } from './samples/protected.router'
export const v1ApiRouter = Router()

v1ApiRouter.use('/samples/auth', samplesAuthRoutes)
v1ApiRouter.use('/samples/protected', auth(), samplesProtectedRoutes)
