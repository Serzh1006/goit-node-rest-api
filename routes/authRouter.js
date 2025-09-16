import express from "express";
import validateBody from "../helpers/validateBody.js";
import { registerSchema, loginSchema } from "../schemas/authSchemas.js";
import {
  registerController,
  loginController,
  currentController,
  changeAvatarController,
  logoutController,
} from "../controllers/authControllers.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";

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

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  changeAvatarController
);

authRouter.get("/current", authenticate, currentController);
authRouter.get("/logout", authenticate, logoutController);

export default authRouter;
