import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  ZodError,
  ZodTypeAny,
} from "zod";

export const validate =
  (schema: ZodTypeAny) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      schema.parse(req.body);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(error);
      }

      next(error);
    }
  };