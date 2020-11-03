import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderItemDTO {
  @IsNotEmpty()
  product: string

  @IsPositive()
  unitPrice: number

  @IsPositive()
  quantity: number
}