import bcrypt from "bcrypt";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import fs from "fs/promises";
import User from "../db/User.js";
import "dotenv/config";
import path from "path";

const { SECRET_KEY } = process.env;
const publicDir = path.resolve("public", "avatars");

export const findUser = async (query) => {
  return User.findOne({
    where: query,
  });
};

export const registerUser = async (payload) => {
  const url = gravatar.url(
    payload.email,
    { s: "100", r: "x", d: "retro" },
    true
  );
  const hashPassword = await bcrypt.hash(payload.password, 10);
  return User.create({ ...payload, password: hashPassword, avatarURL: url });
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await findUser({ email });

  if (!user) {
    throw new createError.Unauthorized("Email or password is wrong!");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw new createError.Unauthorized("Email or password is wrong!");
  }
  const tokenPayload = {
    id: user.id,
  };

  const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "24h" });
  await user.update({ token });

  return {
    token: token,
    user: { email, subscription: user.subscription },
  };
};

export const changeAvatarUser = async (file, user) => {
  const newPath = path.join(publicDir, file.filename);
  await fs.rename(file.path, newPath);
  const poster = path.join("avatars", file.filename);
  await user.update({ avatarURL: poster });
  return poster;
};

export const logoutUser = async (user) => {
  await user.update({ token: null });
};
