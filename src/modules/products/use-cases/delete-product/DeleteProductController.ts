import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProductUseCase } from "./DeleteProductUseCase";

class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const product_id = request.params.id;
    const { is_active } = request.body;
    const deleteProductUseCase = container.resolve(DeleteProductUseCase);

    await deleteProductUseCase.execute({
      product_id: Number(product_id),
      is_active: Boolean(is_active),
    });

    return response.status(204).send();
  }
}

export { DeleteProductController };
