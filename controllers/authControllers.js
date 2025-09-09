import createError from "http-errors";
import { registerUser } from "../services/authServices.js";

export const registerController = async (req, res) => {
  const { email, name } = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    data: { email, name },
  });
};

export const loginController = (req, res) => {};
