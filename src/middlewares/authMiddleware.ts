import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import * as sessionService from "../services/client/session";

interface JwtPayload {
  userId: number;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.header("Authorization");

    const token = authHeader?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const userSession = await sessionService.findSessionByToken(token);

    if (userSession.token !== token) return res.sendStatus(401);

    res.locals.userId = userId;
    next();
  } catch (e) {
    return res.sendStatus(401);
  }
}
