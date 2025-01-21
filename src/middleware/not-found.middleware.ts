import { logger } from "@/utils/logger.utils";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

export const notFound: RequestHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const notFoundError = createHttpError.NotFound("Not Found");
  logger.info(notFoundError);
  next(notFoundError);
};
