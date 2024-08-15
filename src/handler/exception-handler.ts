import { NextFunction, Request, Response } from "express";

export const ExceptionHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.name);
  res.status(401).json({
    message: "Bad Request",
  });
};
