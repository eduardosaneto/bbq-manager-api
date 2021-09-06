import Sessions from "../../entities/Sessions";

export async function findSessionByToken(token: string) {
  const session = await Sessions.findOne({ where: { token } });

  return session;
}
