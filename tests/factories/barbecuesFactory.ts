import Barbecue from "../../src/entities/Barbecues";
import faker from "faker";

export async function createBarbecue() {
  const barbecue = Barbecue.create({
    name: faker.name.firstName(),
    date: "05/12",
    description: faker.lorem.lines(),
    observations: faker.lorem.lines(),
    foodValue: 20,
    drinkValue: 20,
    amountCollected: 150,
    totalParticipants: 10,
    userId: 1,
  });

  await barbecue.save();

  return barbecue;
}
