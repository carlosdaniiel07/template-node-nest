import { IsEmail, IsEnum, IsNotEmpty } from "class-validator"
import { AuthRole } from "src/modules/auth/auth-role.enum"

export class SignUpDto {
  @IsEmail()
  email: string
  
  @IsNotEmpty()
  password: string

  @IsEnum(AuthRole)
  role: AuthRole
}