import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
} from "../controllers/authControllers.js";

const authRouter = express.Router();
const middlewareJson = express.json();

authRouter.post(
  "/register",
  middlewareJson,
  validateBody(registerSchema),
  registerController
);

authRouter.post(
  "/login",
  middlewareJson,
  validateBody(loginSchema),
  loginController
);

export default authRouter;
