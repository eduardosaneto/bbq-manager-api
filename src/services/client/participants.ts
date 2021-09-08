import Participants from "../../entities/Participants";
import Barbecue from "../../entities/Barbecues";
import { ParticipantData } from "../../interfaces/ParticipantData";

export async function getParcitipantsByBarbecueId(barbecueId: number) {
  const participants = await Participants.getParticipants(barbecueId);
  return participants;
}

export async function addBarbecueParticipant(data: ParticipantData) {
  await Participants.addParticipant(data);
  await Barbecue.increasePeople(data);
  if (data.payed) {
    await Barbecue.increaseAmount(data);
  }
}

export async function checkPayment(personId: number, barbecueId: number) {
  await Participants.checkPayment(personId, barbecueId);
}

export async function uncheckPayment(personId: number, barbecueId: number) {
  await Participants.uncheckPayment(personId, barbecueId);
}
