import Barbecue from "../../src/entities/Barbecues";
import faker from "faker";

export async function createBarbecue() {
  const barbecue = {
    name: faker.name.firstName(),
    date: faker.date.future(),
    description: faker.lorem.lines(),
    observations: faker.lorem.lines(),
    amountCollected: 150,
    totalParticipants: 10,
    userId: 1,
  };

  return barbecue;
}

export async function getBarbecues() {
  return await Barbecue.find({ where: { userId: 1 } });
}
