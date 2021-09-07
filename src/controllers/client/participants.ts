import { Request, Response } from "express";

import * as participantsServices from "../../services/client/participants";

export async function getBarbecueParticipants(req: Request, res: Response) {
  const barbecueId = Number(req.params.id);
  const participants = await participantsServices.getParcitipantsByBarbecueId(barbecueId);
  res.send(participants);
}
