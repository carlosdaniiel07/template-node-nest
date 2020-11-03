import { Column, Entity } from "typeorm";

import { BaseEntity } from "src/models/BaseEntity";
import { AuthRole } from "src/modules/auth/auth-role.enum";

@Entity()
export class Auth extends BaseEntity {
  @Column({
    length: 80,
    nullable: false
  })
  email: string
  
  @Column({
    length: 255,
    nullable: false
  })
  password: string

  @Column({
    length: 30,
    nullable: false
  })
  role: AuthRole
}