import { ArrayNotEmpty, IsNotEmpty } from "class-validator";
import { CreateOrderItemDTO } from "./CreateOrderItemDTO";

export class CreateOrderDTO {
  @IsNotEmpty()
  customer: string

  @IsNotEmpty()
  address: string

  @ArrayNotEmpty()
  items: CreateOrderItemDTO[]
}