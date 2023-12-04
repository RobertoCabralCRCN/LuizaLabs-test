import { inject, injectable } from "tsyringe";

import { IUserRepository } from "../../repositories/interfaces/UsersRepository.interfaces";
import { ICreateUserRequestDTO } from "./dtos/create-user-request.dto";
import { ICreateUserResponseDTO } from "./dtos/create-user-response.dto";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(input: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    const requested = await this.userRepository.create(input);

    return requested;
  }
}

export { CreateUserUseCase };
