
import { container } from "tsyringe";
import { IUserRepository } from "../../modules/user/repositories/interfaces/UsersRepository.interfaces";
import { UserRepository } from "../../modules/user/repositories/implementations/UsersRepository";
import { IProductRepository } from "../../modules/products/repositories/interfaces/ProductRepository.interface";
import { ProductRepository } from "../../modules/products/repositories/implementations/ProductRepository";
import { IOrderRepository } from "../../modules/orders/repositories/interfaces/OrdersRepository.interface";
import { OrderRepository } from "../../modules/orders/repositories/implementations/OrdersRepository";
import { IOrderItemRepository } from "../../modules/orders/repositories/interfaces/OrderItemRepository.interface";
import { OrderItemRepository } from "../../modules/orders/repositories/implementations/OrderItemRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository
);

container.registerSingleton<IOrderRepository>(
  "OrderRepository",
  OrderRepository
);

container.registerSingleton<IOrderItemRepository>(
  "OrderItemRepository",
  OrderItemRepository
);

