import { logger } from '@/utils/logger.utils'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'

export const validAcceptHeaders =
  (...acceptHeader: string[]): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    const acceptFromRequest = req.headers.accept
    const isValidAccept =
      acceptFromRequest && acceptHeader.some(header => acceptFromRequest?.includes(header))
    logger.info(`Accept header: ${acceptFromRequest}`)
    if (!acceptFromRequest || isValidAccept) {
      next()
    } else {
      next(createHttpError.NotAcceptable(`Accept header must be one of ${acceptHeader.join(', ')}`))
    }
  }
