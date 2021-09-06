import jwt from "jsonwebtoken";

import User from "../../entities/Users";
import Sessions from "../../entities/Sessions";

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) return null;

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
  );

  await Sessions.createNew(user.id, token);

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    token,
  };
}
