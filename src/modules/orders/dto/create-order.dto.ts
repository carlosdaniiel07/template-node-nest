import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
  @IsNotEmpty()
  customer: string

  @IsNotEmpty()
  address: string

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[]
}