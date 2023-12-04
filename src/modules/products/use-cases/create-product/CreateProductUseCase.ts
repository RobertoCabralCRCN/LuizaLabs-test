import { inject, injectable } from "tsyringe";

import { IProductRepository } from "../../repositories/interfaces/ProductRepository.interface";
import { ICreateProductRequestDTO } from "./dtos/CreateProductRequest.dto";
import { ICreateProductResponseDTO } from "./dtos/CreateProductResponse.dto";

@injectable()
class CreateProductUseCase {
  constructor(
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(
    input: ICreateProductRequestDTO
  ): Promise<ICreateProductResponseDTO> {
    const productCreted = await this.productRepository.create({
      product_id: input.product_id,
      name: input.name,
      description: input.description,
      value: input.value,
      is_active: input.is_active,
    });

    return productCreted;
  }
}

export { CreateProductUseCase };
