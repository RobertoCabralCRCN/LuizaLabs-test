import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetByUserOrderUseCase } from "./GetByUserOrderUserCase";

class GetByUserOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.params.id;
    const getByUserOrderUseCase = container.resolve(GetByUserOrderUseCase);

    const orders = await getByUserOrderUseCase.execute({
      user_id: Number(user_id),
    });

    return response.status(200).send(orders);
  }
}

export { GetByUserOrderController };
