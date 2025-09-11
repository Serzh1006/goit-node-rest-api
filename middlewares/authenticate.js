import createError from "http-errors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { findUser } from "../services/authServices.js";

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new createError.Unauthorized("Authorization header missing!");
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw new createError.Unauthorized(
      "Authorization header must have bearer type!"
    );
  }

  const { id } = jwt.verify(token, SECRET_KEY);
  const user = await findUser({ id });

  if (!user) {
    throw new createError.Unauthorized("User not found!");
  }

  req.user = user;
  next();
};
