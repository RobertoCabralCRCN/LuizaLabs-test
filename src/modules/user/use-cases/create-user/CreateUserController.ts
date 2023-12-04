import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, user_id } = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);

    const userCreated = await createUserUseCase.execute({ name, user_id });

    return response.status(201).send(userCreated);
  }
}

export { CreateUserController };
