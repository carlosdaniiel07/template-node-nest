import { BaseEntity } from "src/models/base-entity.model";
import { Column, Entity, OneToMany } from "typeorm";
import { OrderItem } from "./order-item.entity";
import { OrderStatus } from "./order-status.enum";

@Entity()
export class Order extends BaseEntity {
  @Column({
    length: 100,
    nullable: false,
  })
  customer: string

  @Column({
    length: 160,
    nullable: false
  })
  address: string

  @Column({
    nullable: false,
  })
  value: number

  @Column({
    length: 30,
    nullable: false
  })
  status: OrderStatus

  @OneToMany(type => OrderItem, orderItem => orderItem.order, {
    eager: true,
    cascade: ['insert', 'remove']
  })
  items: OrderItem[]
}