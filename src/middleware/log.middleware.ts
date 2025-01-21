import { logger } from "@/utils/logger.utils";
import morgan from "morgan";

export const logMiddleware = morgan(
  (tokens, req, res) => {
    const status = tokens?.status?.(req, res);
    return JSON.stringify({
      method: tokens.method?.(req, res),
      url: tokens.url?.(req, res),
      status: status ? Number.parseFloat(status) : null,
      content_length: tokens.res?.(req, res, "content-length"),
      response_time: Number.parseFloat(
        tokens["response-time"]?.(req, res) ?? "0",
      ),
    });
  },
  {
    stream: {
      write: (message) => {
        const data: unknown = JSON.parse(message);
        logger.info("incoming-request", data);
      },
    },
  },
);
