import { Request, Response } from "express";

import * as barbecueServices from "../../services/client/barbecue";

export async function getBarbecues(req: Request, res: Response) {
  const userId = res.locals.userId;
  const barbecues = await barbecueServices.getAllBarbecues(userId);
  res.send(barbecues);
}
