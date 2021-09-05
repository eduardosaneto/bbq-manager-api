import { NextFunction, Request, Response } from "express";

/* eslint-disable-next-line */
function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err) {
    /* eslint-disable-next-line no-console */
    console.log(err);
    res.status(500).send(err);
  }
}

export { errorHandler };
