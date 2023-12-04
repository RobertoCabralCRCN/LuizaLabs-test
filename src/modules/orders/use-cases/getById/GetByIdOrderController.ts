import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetByIdOrderUseCase } from "./GetByIdOrderUseCase";

class GetByIdOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const order_id = request.params.id;
    const getByIdOrderUseCase = container.resolve(GetByIdOrderUseCase);

    const order = await getByIdOrderUseCase.execute({
      order_id: Number(order_id),
    });

    return response.status(200).send(order);
  }
}

export { GetByIdOrderController };
