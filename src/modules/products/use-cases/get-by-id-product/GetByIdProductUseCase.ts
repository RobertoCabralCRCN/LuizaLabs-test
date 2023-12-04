import { inject, injectable } from "tsyringe";

import { IProductRepository } from "../../repositories/interfaces/ProductRepository.interface";
import { IGetByIProductRequestDTO } from "./dtos/GetByIdProductRequest.dto";
import { IGetByIProductResponsetDTO } from "./dtos/GetByIdProductResponse.dto";

@injectable()
class GetByIdProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(
    input: IGetByIProductRequestDTO
  ): Promise<IGetByIProductResponsetDTO> {
    const products = await this.productRepository.findById(input.product_id);

    return products;
  }
}

export { GetByIdProductUseCase };
