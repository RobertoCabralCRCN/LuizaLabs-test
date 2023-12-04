import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, value, is_active, product_id } = request.body;
    const createProductUseCase = container.resolve(CreateProductUseCase);

    const productCreated = await createProductUseCase.execute({
      product_id,
      name,
      description,
      value,
      is_active,
    });

    return response.status(201).send(productCreated);
  }
}

export { CreateProductController };
