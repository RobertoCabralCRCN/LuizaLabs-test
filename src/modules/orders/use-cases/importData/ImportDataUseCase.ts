import { inject, injectable } from "tsyringe";

import { IOrderRepository } from "../../repositories/interfaces/OrdersRepository.interface";
import { IUserRepository } from "../../../user/repositories/interfaces/UsersRepository.interfaces";
import { IOrderItemRepository } from "../../repositories/interfaces/OrderItemRepository.interface";
import { IProductRepository } from "../../../products/repositories/interfaces/ProductRepository.interface";

interface IDataObject {
    user_id: number,
    user_name: string,
    order_id: number,
    product_id: number,
    order_item_value: number,
    order_date: Date
}

@injectable()
class ImportDataUseCase {
  constructor(
    @inject("OrderRepository")
    private orderRepository: IOrderRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository,

    @inject("ProductRepository")
    private productRepository: IProductRepository,

    @inject("OrderItemRepository")
    private orderItemRepository: IOrderItemRepository
  ) {}


  private async saveUser(user_id: number, user_name: string): Promise<void> {
    const user = await this.userRepository.findById(user_id)
    if (!user) {
        await this.userRepository.create({
            name: user_name,
            user_id
        })
    }
  }

  private async saveProduct(product_id: number): Promise<void> {
    const product = await this.productRepository.findById(product_id)
    if (!product){
        await this.productRepository.create({
            product_id,
            name: 'Created By Import',
            description: 'Created By Import',
            value: 0,
            is_active: true
        })
    }
  }



  private transformDataToJson(fileContent: string): IDataObject[] {
    const lines = fileContent.split('\n');

    const data: IDataObject[] = []

    lines.forEach((line) => {
  
        if (line.trim() === '') {
            return;
        }    
        const user_id = parseInt(line.substring(0, 10).trim(), 10)
        const user_name = line.substring(12, 55).trim()
        const order_id = parseInt(line.substring(57, 65).trim(), 10)
        const product_id = parseInt(line.substring(67, 76).trim(), 10)
        const order_item_value = parseFloat(line.substring(75, 87).trim())

        const rawDate = line.substring(87, 96).trim(); 
        const order_date = new Date(`${rawDate.substring(0, 4)}-${rawDate.substring(4, 6)}-${rawDate.substring(6, 8)}`);

        data.push({
            user_id,
            user_name,
            order_id,
            product_id,
            order_item_value,
            order_date
        })
    });    

    return data
  } 

  async execute(
    fileContent: string
  ): Promise<void> {
    const dataToImport = this.transformDataToJson(fileContent)
    console.info('Transformando o dados para JSON')


    const users = []
    const products = []
    const orders = []
    const orderItems = []

    console.info('Filtrando os dados para organizar a ordem de gravação dos registros')
    dataToImport.forEach(item => {
        const userFinded = users.find(user => user.user_id === item.user_id)
        if (!userFinded) {
            users.push({user_id: item.user_id, user_name: item.user_name})
        }

        const productFinded = products.find(product => product.product_id === item.product_id)
        if (!productFinded) {
            products.push({product_id: item.product_id})
        }

        const orderFinded = orders.find(order => order.order_id === item.order_id)
        if (!orderFinded) {
            orders.push({order_id: item.order_id, user_id: item.user_id, order_date: item.order_date})
        }

        orderItems.push({order_id: item.order_id, product_id: item.product_id, value: item.order_item_value})
    })
    console.info('Fim da filtragem')

    console.info('Salvando os usuários')
    for (const item of users) {
        await this.saveUser(item.user_id, item.user_name)
    } 

    console.info('Salvando os Produtos')
    for (const item of products) {
        await this.saveProduct(item.product_id)
    } 

    console.info('Salvando os Pedidos')
    await this.orderRepository.createBulk(orders)


    console.info('Salvando os Itens')
    const itensToSave = orderItems.map(item => ({
        order_id: item.order_id,
        product_id: item.product_id,
        price: item.value,
        qty: 1,
        sub_total: item.value
    }))

    await this.orderItemRepository.createBulk(itensToSave)


    console.info('Fim da importação')

    return
  }
}

export { ImportDataUseCase };
