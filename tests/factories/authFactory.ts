import jwt from "jsonwebtoken";

import Session from "../../src/entities/Sessions";
import User from "../../src/entities/Users";

export async function createSession(userId: number, userEmail: string) {
  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET,
  );

  await Session.createNew(userId, token);

  return {
    user: {
      id: userId,
      email: userEmail,
    },
    token,
  };
}
