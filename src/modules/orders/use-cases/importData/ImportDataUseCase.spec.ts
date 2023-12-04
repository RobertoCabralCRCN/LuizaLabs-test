import { FakeProductRepository } from "../../../products/repositories/fakes/FakeProductRepository";
import { FakeUserRepository } from "../../../user/repositories/fakes/FakeUserRepository";
import { FakeOrderItemRepository } from "../../repositories/fakes/FakeOrderItemRepository";
import { FakeOrderRepository } from "../../repositories/fakes/FakeOrderRepository";
import { ImportDataUseCase } from "./ImportDataUseCase";

let importDataUseCase: ImportDataUseCase;
let fakeOrderRepository: FakeOrderRepository;
let fakeUserRepository: FakeUserRepository;
let fakeProductRepository: FakeProductRepository;
let fakeOrderItemRepository: FakeOrderItemRepository;


const mockData = `
0000000088                             Terra Daniel DDS00000008360000000003     1899.0220210909
0000000103                                 Gail Bradtke00000009660000000005     1564.2120210507
0000000083                          Frances Satterfield00000007910000000006      224.7520211122
0000000141                                  Lloyd Mante00000013040000000001     1760.0120211012
`
describe("Retrieve User Order", () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeProductRepository = new FakeProductRepository();
    fakeOrderItemRepository = new FakeOrderItemRepository();
    importDataUseCase = new ImportDataUseCase(
        fakeOrderRepository,
        fakeUserRepository,
        fakeProductRepository,
        fakeOrderItemRepository
        );
    jest.resetModules();
  });

  it("Should be able retrieve a user order", async () => {
    fakeOrderRepository.create({
      date: new Date(),
      order_id: 1,
      user_id: 1
    })
    await expect(
        importDataUseCase.execute(mockData)
    ).resolves.not.toThrow();
  });
});
