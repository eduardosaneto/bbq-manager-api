import { Request, Response } from "express";
import { ParticipantData } from "../../interfaces/ParticipantData";

import * as participantsServices from "../../services/client/participants";

export async function getBarbecueParticipants(req: Request, res: Response) {
  const barbecueId = Number(req.params.id);
  const participants = await participantsServices.getParcitipantsByBarbecueId(barbecueId);
  res.send(participants);
}

export async function addBarbecueParticipant(req: Request, res: Response) {
  const participantData = req.body as ParticipantData;
  await participantsServices.addBarbecueParticipant(participantData);
  res.sendStatus(201);
}

export async function checkPayment(req: Request, res: Response) {
  const personId = Number(req.params.id);
  await participantsServices.checkPayment(personId);
  res.sendStatus(201);
}

export async function uncheckPayment(req: Request, res: Response) {
  const personId = Number(req.params.id);
  await participantsServices.uncheckPayment(personId);
  res.sendStatus(201);
}
