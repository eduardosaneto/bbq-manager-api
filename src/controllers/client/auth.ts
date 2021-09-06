import { Request, Response } from "express";

import signInSchema from "../../schemas/signInSchema";
import * as authServices from "../../services/client/auth";

export async function signIn(req: Request, res: Response) {
  const validBody = signInSchema.validate(req.body);

  if (validBody.error) res.sendStatus(400);

  const { email, password } = req.body as { email: string; password: string };
  const token = await authServices.signIn(email, password);

  if (token === null) return res.sendStatus(401);

  res.status(200).send({ token });
}
