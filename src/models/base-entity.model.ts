import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column({
    name: 'is_active',
    nullable: false,
    default: true
  })
  isActive?: boolean

  @CreateDateColumn({
    name: 'created_at',
    nullable: false
  })
  createdAt?: Date

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false
  })
  updatedAt?: Date

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date
}