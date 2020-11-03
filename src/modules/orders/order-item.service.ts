import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem) private repository: Repository<OrderItem>
  ) {}

  async deleteByOrder(orderId: string): Promise<any> {
    return await this.repository.delete({ order: { id: orderId } })
  }
}