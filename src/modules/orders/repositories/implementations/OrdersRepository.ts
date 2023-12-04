import { getRepository, Repository } from "typeorm";

import { Order } from "../../entities/Order";
import {
  ICreateOrderDTO,
  IOrderRepository,
} from "../interfaces/OrdersRepository.interface";

class OrderRepository implements IOrderRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }
  async create(data: ICreateOrderDTO): Promise<Order> {
    const order = await this.repository.create({
      order_id: data.order_id,
      user_id: data.user_id,
      date: data.date,
    });
    await this.repository.save(order)
    return order;
  }

  async findById(order_id: number): Promise<Order> {
    const orderFounded = await this.repository.findOne({ order_id });
    return orderFounded;
  }

  async findByUser(user_id: number): Promise<Order[]> {
    const itemsFounded = await this.repository.find({ user_id });
    return itemsFounded;
  }

  async createBulk(data: ICreateOrderDTO[]): Promise<void> {
    const itens = this.repository.create(data)

    await this.repository.save(itens)
  }
  
  async findAll(skip?: number, limit?: number): Promise<Order[]> {
    const itens = await this.repository.find({skip: skip || 0, take: limit || 0})

    return itens    
  }
}

export { OrderRepository };
