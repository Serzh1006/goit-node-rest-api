import bcrypt from "bcrypt";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import fs from "fs/promises";
import { nanoid } from "nanoid";
import User from "../db/User.js";
import { sendEmail } from "../helpers/sendEmail.js";
import "dotenv/config";
import path from "path";

const { SECRET_KEY, BASE_URL } = process.env;
const publicDir = path.resolve("public", "avatars");

export const findUser = async (query) => {
  return User.findOne({
    where: query,
  });
};

const createVerifyEmail = async ({ verificationCode, email }) => {
  return {
    to: email,
    subject: "Verify email",
    html: `<a href="${BASE_URL}/api/auth/verify/${verificationCode}">Click me</a>`,
  };
};

export const registerUser = async (payload) => {
  const url = gravatar.url(
    payload.email,
    { s: "100", r: "x", d: "retro" },
    true
  );
  const hashPassword = await bcrypt.hash(payload.password, 10);
  const verificationCode = nanoid();
  const newUser = await User.create({
    ...payload,
    password: hashPassword,
    avatarURL: url,
    verificationToken: verificationCode,
  });

  const verifyEmail = await createVerifyEmail({
    verificationCode,
    email: payload.email,
  });

  await sendEmail(verifyEmail);
  return newUser;
};

export const verifyUser = async (verificationToken) => {
  const user = await findUser({ verificationToken });
  if (!user) throw new createError.Unauthorized("User not found!");
  if (user.verify)
    throw new createError.Unauthorized("Email already verified!");
  await user.update({ verify: true, verificationToken: null });
};

export const resendVerifyEmail = async ({ email }) => {
  const user = await findUser({ email });
  if (!user || user.verify) {
    throw new createError.BadRequest("Verification has already been passed!");
  }

  const verifyEmail = await createVerifyEmail({
    verificationCode: user.verificationToken,
    email,
  });

  await sendEmail(verifyEmail);
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await findUser({ email });

  if (!user) throw new createError.Unauthorized("Email or password is wrong!");

  if (!user.verify) throw new createError.Unauthorized("Email not verified!");

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword)
    throw new createError.Unauthorized("Email or password is wrong!");
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
