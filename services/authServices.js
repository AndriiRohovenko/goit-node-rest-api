import User from "../db/models/Users.js";
import HttpError from "../helpers/HttpError.js";
import { createToken, verifyToken } from "../helpers/jwt.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export const findUser = (where) => {
  return User.findOne({ where });
};

export const registerUser = async (payload) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);
  const newUser = await User.create({ ...payload, password: hashedPassword });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id };
  const token = createToken(payload);
  await user.update({ token });
  return {
    accessToken: token,
    user: { email: user.email, subscription: user.subscription },
  };
};

export const getCurrentUser = async (user_id) => {
  const user = await findUser({ id: user_id });
  if (!user) {
    throw HttpError(401, "Unauthorized");
  }
  return {
    email: user.email,
    subscription: user.subscription,
  };
};

export const refreshUser = async (user_id) => {
  const token = createToken({ id: user_id });
  const user = await findUser({ id: user_id });
  await user.update({ token });

  return {
    token,
    user: {
      username: user.username,
      email: user.email,
    },
  };
};

export const logoutUser = async (user_id) => {
  const user = await findUser({ id: user_id });
  await user.update({ token: null });

  return true;
};
