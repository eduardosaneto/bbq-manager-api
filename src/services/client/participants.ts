import Participants from "../../entities/Participants";
import { ParticipantData } from "../../interfaces/ParticipantData";

export async function getParcitipantsByBarbecueId(barbecueId: number) {
  const participants = await Participants.getParticipants(barbecueId);
  return participants;
}

export async function addBarbecueParticipant(data: ParticipantData) {
  await Participants.addParticipant(data);
}
