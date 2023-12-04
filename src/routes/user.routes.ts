import { Router } from "express";

import { CreateUserController } from "../modules/user/use-cases/create-user/CreateUserController";

const userRoutes = Router();
const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
