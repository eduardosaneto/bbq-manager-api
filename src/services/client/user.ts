import User from "../../entities/Users";

export async function createNewUser(email: string, name: string, password: string) {
  const user = await User.createNew(email, name, password);
  return user;
}
