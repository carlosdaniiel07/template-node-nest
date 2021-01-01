import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthRole } from "../auth/auth-role.enum";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./order.entity";
import { OrderService } from "./order.service";

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
constructor(
  private service: OrderService
  ) {}

  @Get()
  async index(): Promise<Order[]> {
    return await this.service.findAll()
  }

  @Get(':id')
  async get(@Param('id') orderId: string): Promise<Order> {
    return await this.service.findById(orderId)
  }

  @Post()
  async save(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    return await this.service.create(createOrderDto)
  }

  @Delete(':id')
  @Roles(AuthRole.ROLE_ADMIN)
  async delete(@Param('id') orderId: string): Promise<any> {
    return await this.service.delete(orderId)
  }
}