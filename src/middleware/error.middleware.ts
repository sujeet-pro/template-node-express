/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const httpError = createHttpError.isHttpError(err)
    ? err
    : createHttpError.InternalServerError(err.message) //  createHttpError(500, err);
  const status: number = httpError.status || 500
  const message: string = httpError.message || 'Something Went Wrong'

  res.status(status)
  if (status === 404) {
    res.render('pages/not-found.ejs', {})
  }

  // set locals, only providing error in development
  // res.locals = res.locals || {}
  res.locals.message = message
  res.locals.status = status
  res.locals.error = req.app.get('env') === 'development' ? (httpError as unknown) : {}

  res.render('pages/error.ejs', {})
}
