import { Product } from "../../entities/Product";

interface ICreateProductDTO {
  product_id: number;
  name: string;
  description: string;
  value: number;
  is_active: boolean;
  created_at?: Date;
}

interface IUpdateProductDTO {
  product_id: number;
  name: string;
  description: string;
  value: number;
  is_active: boolean;
  updated_at?: Date;
}

interface IProductRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findAll(): Promise<Product[]>;
  findById(product_id: number): Promise<Product>;
  update(data: IUpdateProductDTO): Promise<Product>;
}

export { IProductRepository, ICreateProductDTO, IUpdateProductDTO };
