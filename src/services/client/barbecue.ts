import Barbecue from "../../entities/Barbecues";
import { BarbecueData } from "../../interfaces/BarbecueData";

export async function getAllBarbecues(userId: number) {
  const barbecues = await Barbecue.find({ where: { userId } });
  return barbecues;
}

export async function createBarbecue(data: BarbecueData) {
  await Barbecue.saveBarbecue(data);
}

export async function getBarbecueById(barbecueId: number) {
  const barbecue = await Barbecue.getBarbecueById(barbecueId);
  return barbecue;
}
