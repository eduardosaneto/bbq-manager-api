import Users from "../../src/entities/Users";

export async function createUsers() {
  const users = await Users.find();
  return users;
}
