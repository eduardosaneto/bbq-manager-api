import User from "../../src/entities/Users";
import faker from "faker";

export async function createUser() {
  const user = User.create({
    email: faker.internet.email(),
    name: faker.name.firstName(),
    password: "123456",
  });

  await user.save();

  return user;
}
