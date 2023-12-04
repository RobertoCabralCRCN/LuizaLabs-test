import { Product } from "../../entities/Product";
import {
  ICreateProductDTO,
  IProductRepository,
  IUpdateProductDTO,
} from "../interfaces/ProductRepository.interface";

class FakeProductRepository implements IProductRepository {
  private products: Product[] = [];

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, data);

    this.products.push(product);

    return Promise.resolve(product);
  }

  async findAll(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }
  async findById(product_id: number): Promise<Product> {
    const foundProduct = this.products.find(
      (item) => item.product_id === product_id
    );

    return Promise.resolve(foundProduct);
  }
  async update(data: IUpdateProductDTO): Promise<Product> {
    const product = this.products.find(
      (item) => item.product_id === data.product_id
    );

    Object.assign(product, {
      name: data.name,
      description: data.description,
      value: data.value,
      is_active: data.is_active,
      updated_at: data.updated_at,
    });

    return Promise.resolve(product);
  }

}
export { FakeProductRepository };
