import Users from "../../src/entities/Users";

export async function clearDatabase() {
  await Users.delete({});
}
