import { inject, injectable } from "tsyringe";

import { IOrderRepository } from "../../repositories/interfaces/OrdersRepository.interface";
import { OrderGroupByUserMap } from "./mapper/mapper";
import { IGetAllOrdersRequestDTO } from "./dtos/GetAllOrdersRequest.dto";
import { IGetAllOrdersResponseDTO } from "./dtos/GetAllOrdersResponse.dto";

@injectable()
class GetAllOrdersUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository
  ) {}

  async execute(
    input: IGetAllOrdersRequestDTO
  ): Promise<IGetAllOrdersResponseDTO[]> {
    const ordersFinded = await this.orderRepository.findAll(input.skip, input.limit)

    return OrderGroupByUserMap.toDTO(ordersFinded)
    
  }
}

export { GetAllOrdersUseCase };
