import { Request, Response } from "express";

import signUpSchema from "../../schemas/signUpSchema";
import * as userServices from "../../services/client/user";

export async function signUp(req: Request, res: Response) {
  const { error } = signUpSchema.validate(req.body);
  if (error) return res.sendStatus(400);

  const { email, name, password } = req.body as { email: string; name: string; password: string };
  const user = await userServices.createNewUser(email, name, password);
  if (user) return res.sendStatus(409);
  res.sendStatus(201);
}
