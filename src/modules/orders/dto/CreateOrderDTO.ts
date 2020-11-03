import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateOrderItemDTO } from "./CreateOrderItemDTO";

export class CreateOrderDTO {
  @IsNotEmpty()
  customer: string

  @IsNotEmpty()
  address: string

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  items: CreateOrderItemDTO[]
}