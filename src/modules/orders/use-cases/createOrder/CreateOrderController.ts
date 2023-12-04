import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, order_id } = request.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const orderCreated = await createOrderUseCase.execute({
      order_id: Number(order_id),
      user_id: Number(user_id),
      date: new Date(),
    });

    return response.status(201).send(orderCreated);
  }
}

export { CreateOrderController };
