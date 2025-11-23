import express from "express";
import {
  addUserController,
  loginUserController,
} from "../controllers/authControllers.js";

import validateBody from "../helpers/validateBody.js";
import { registerUserSchema, loginUserSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerUserSchema),
  addUserController
);
authRouter.post("/login", validateBody(loginUserSchema), loginUserController);

export default authRouter;
