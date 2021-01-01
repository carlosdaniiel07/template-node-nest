import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderItemDto {
  @IsNotEmpty()
  product: string

  @IsPositive()
  unitPrice: number

  @IsPositive()
  quantity: number
}