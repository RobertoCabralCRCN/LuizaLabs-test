import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetByIdProductUseCase } from "./GetByIdProductUseCase";

class GetByIdProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const product_id = request.params.id;
    const getByIdProductUseCase = container.resolve(GetByIdProductUseCase);

    const product = await getByIdProductUseCase.execute({
      product_id: Number(product_id),
    });

    return response.status(200).send(product);
  }
}

export { GetByIdProductController };
