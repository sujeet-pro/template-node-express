import { logger } from '@/utils/logger.utils'
import type { NextFunction, Request, RequestHandler, Response } from 'express'
import createHttpError from 'http-errors'

export const validContentTypeHeaders =
  (...contentTypeHeaders: string[]): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    const contentTypeFromRequest = req.headers['content-type']
    const hasBody =
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'PATCH' ||
      (req.headers['content-length'] && parseInt(req.headers['content-length'], 10) > 0) ||
      req.headers['transfer-encoding'] === 'chunked'
    const isValidContentType =
      contentTypeFromRequest && contentTypeHeaders.includes(contentTypeFromRequest)
    logger.info(`Content-Type header: ${contentTypeFromRequest}`)
    if (!hasBody || isValidContentType) {
      next()
    } else {
      next(
        createHttpError.BadRequest(
          `Content-Type header must be one of ${contentTypeHeaders.join(', ')}`,
        ),
      )
    }
  }
