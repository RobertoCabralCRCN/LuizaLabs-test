import { Repository, getRepository } from "typeorm";

import { User } from "../../entities/User";
import {
  ICreateUserDTO,
  IUserRepository,
} from "../interfaces/UsersRepository.interfaces";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }
  async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.repository.create({
      user_id: data.user_id,
      name: data.name,
    });

    await this.repository.save(user)
    return user;
  }

  async findById(user_id: number): Promise<User> {
    const user = await this.repository.findOne({user_id})

    return user;
  }  
}

export { UserRepository };
