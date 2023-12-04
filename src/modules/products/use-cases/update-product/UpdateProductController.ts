import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const product_id = request.params.id;
    const { name, description, value, is_active } = request.body;
    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    const productUpdeted = await updateProductUseCase.execute({
      product_id: Number(product_id),
      name: name as string,
      description: description as string,
      value: value as number,
      is_active: is_active as boolean,
    });

    return response.status(200).send(productUpdeted);
  }
}

export { UpdateProductController };
