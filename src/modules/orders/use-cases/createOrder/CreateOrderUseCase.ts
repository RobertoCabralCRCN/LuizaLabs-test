import { inject, injectable } from "tsyringe";

import { IOrderRepository } from "../../repositories/interfaces/OrdersRepository.interface";
import { ICreateOrderRequestDTO } from "./dtos/CreateOrderRequest.dto";
import { ICreateOrderResponseDTO } from "./dtos/CreateOrderResponse.dto";
import { IUserRepository } from "../../../user/repositories/interfaces/UsersRepository.interfaces";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(
    input: ICreateOrderRequestDTO
  ): Promise<ICreateOrderResponseDTO> {
    const user = await this.userRepository.findById(input.user_id)

    if (!user) {
      throw new AppError('Usuário não encontrado', 404)
    }
    const created = await this.orderRepository.create(input);

    return created;
  }
}

export { CreateOrderUseCase };
