import { Request, Response } from "express";

import * as barbecueServices from "../../services/client/barbecue";
import { BarbecueData } from "../../interfaces/BarbecueData";

export async function getBarbecues(req: Request, res: Response) {
  const userId = res.locals.userId;
  const barbecues = await barbecueServices.getAllBarbecues(userId);
  res.send(barbecues);
}

export async function addBarbecue(req: Request, res: Response) {
  const barbecueData = req.body as BarbecueData;
  await barbecueServices.createBarbecue(barbecueData);
  res.sendStatus(201);
}

export async function getBarbecueById(req: Request, res: Response) {
  const barbecueId = Number(req.params.id);
  const barbecue = await barbecueServices.getBarbecueById(barbecueId);
  res.send(barbecue);
}
