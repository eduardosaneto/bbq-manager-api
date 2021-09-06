import Barbecue from "../../entities/Barbecues";

export async function getAllBarbecues(userId: number) {
  const barbecues = await Barbecue.find({ where: { userId } });
  return barbecues;
}
