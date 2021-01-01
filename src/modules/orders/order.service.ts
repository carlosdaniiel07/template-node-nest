import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ApiException } from "src/models/api-exception.model";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderItem } from "./order-item.entity";
import { OrderStatus } from "./order-status.enum";
import { Order } from "./order.entity";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private repository: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepository: Repository<OrderItem>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.repository.find()
  }

  async findById(orderId: string): Promise<Order> {
    const order = await this.repository.findOne({ where: { id: orderId } })

    if (!order) {
      throw new ApiException(404, 'Pedido não encontrado')
    }

    return order
  }

  async create(createOrderDto: CreateOrderDto): Promise<any> {
    const { customer, address, items } = createOrderDto
    
    const orderItems: OrderItem[] = items.map(({ product, unitPrice, quantity }) => ({ product, unitPrice, quantity, value: unitPrice * quantity }))
    const order: Order = {
      customer,
      address,
      items: orderItems,
      value: orderItems.map(item => item.value).reduce((acc, current) => current += acc, 0),
      status: OrderStatus.PENDING
    }

    return await this.repository.save(order)
  }

  async delete(orderId: string): Promise<any> {
    await this.findById(orderId)
    
    await this.repository.softDelete({ id: orderId })
    await this.orderItemRepository.softDelete({ order: { id: orderId } })

    return { success: true }
  }
}