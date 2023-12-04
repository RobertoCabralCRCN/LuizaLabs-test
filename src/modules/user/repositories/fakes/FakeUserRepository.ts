import { User } from "../../entities/User";
import {
  ICreateUserDTO,
  IUserRepository,
} from "../interfaces/UsersRepository.interfaces";

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, data);

    this.users.push(user);

    return Promise.resolve(user);
  }

  async findById(user_id: number): Promise<User>{
    const user = this.users.find(item => item.user_id === user_id)

    return Promise.resolve(user)
  }
}
export { FakeUserRepository };
