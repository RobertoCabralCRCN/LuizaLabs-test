import "reflect-metadata";
import { FakeUserRepository } from "../../repositories/fakes/FakeUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let fakeUserRepository: FakeUserRepository;

let createUserUseCase: CreateUserUseCase;

const createNew = {
  user_id: 1,
  name: "John Dalton",
};

describe("Create User", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserUseCase = new CreateUserUseCase(fakeUserRepository);

    jest.resetModules();
  });

  it("Should be able to create a user", async () => {
    await expect(createUserUseCase.execute(createNew)).resolves.not.toThrow();
  });
});
