import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllOrdersUseCase } from "./GetAllOrdersUserCase";


class GetAllOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const skip = request.query.skip as unknown as number;
    const limit = request.query.limit as unknown as number;

    const getAllOrdersUseCase = container.resolve(GetAllOrdersUseCase);

    const orders = await getAllOrdersUseCase.execute({skip,limit});

    return response.status(200).send(orders);
  }
}

export { GetAllOrdersController };
