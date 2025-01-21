/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export const errorMiddleware: ErrorRequestHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let httpError
  if (createHttpError.isHttpError(err)) {
    httpError = err
  } else if (err.name === 'UnauthorizedError') {
    httpError = createHttpError.Unauthorized(err.message)
  } else {
    httpError = createHttpError.InternalServerError(err.message)
  }
  const status: number = httpError.status || 500
  const message: string = httpError.message || 'Something Went Wrong'

  res.status(status)
  if (status === 404) {
    // res.render('pages/not-found.ejs', {})
    res.render('pages/error.ejs', {})
  }

  // set locals, only providing error in development
  // res.locals = res.locals || {}
  res.locals.message = message
  res.locals.status = status
  res.locals.error = req.app.get('env') === 'development' ? (httpError as unknown) : {}

  res.render('pages/error.ejs', {})
}
