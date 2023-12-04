import { User } from "../../entities/User";

interface ICreateUserDTO {
  user_id: number;
  name: string;
}

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(user_id: number): Promise<User>;
}

export { IUserRepository, ICreateUserDTO };
