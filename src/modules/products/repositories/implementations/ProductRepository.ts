import { getRepository, Repository } from "typeorm";

import { Product } from "../../entities/Product";
import {
  ICreateProductDTO,
  IProductRepository,
  IUpdateProductDTO,
} from "../interfaces/ProductRepository.interface";

class ProductRepository implements IProductRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }
  async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      product_id: data.product_id,
      name: data.name,
      description: data.description,
      value: data.value,
      is_active: data.is_active,
    });

    await this.repository.save(product)
    return product;
  }

  async findAll(): Promise<Product[]> {
    const founded = await this.repository.find();

    return founded;
  }
  async findById(product_id: number): Promise<Product> {
    return this.repository.findOne({ product_id });
  }
  async update(data: IUpdateProductDTO): Promise<Product> {
    return this.repository.save(data);
  }

}

export { ProductRepository };
