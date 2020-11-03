import { Column, Entity, ManyToOne } from "typeorm";

import { Order } from "./order.entity";
import { BaseEntity } from "src/models/BaseEntity";

@Entity()
export class OrderItem extends BaseEntity {
  @Column({
    length: 160,
    nullable: false
  })
  product: string

  @Column({
    nullable: false
  })
  unitPrice: number

  @Column({
    type: 'int',
    nullable: false
  })
  quantity: number

  @Column({
    nullable: false
  })
  value: number

  @ManyToOne(type => Order, order => order.items, {
    nullable: false
  })
  order?: Order
}