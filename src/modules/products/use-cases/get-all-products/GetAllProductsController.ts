import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetAllProductsUseCase } from "./GetAllProductsUseCase";

class GetAllProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const getAllProductsUseCase = container.resolve(GetAllProductsUseCase);

    const listProducts = await getAllProductsUseCase.execute();

    return response.status(200).send(listProducts);
  }
}

export { GetAllProductsController };
