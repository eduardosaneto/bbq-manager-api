import Participants from "../../entities/Participants";

export async function getParcitipantsByBarbecueId(barbecueId: number) {
  const participants = await Participants.getParticipants(barbecueId);
  return participants;
}
