import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { GetAuthDTO } from "./dto/GetAuthDTO";
import { LoginDTO } from "./dto/LoginDTO";
import { LoginResponseDTO } from "./dto/LoginResponseDTO";
import { SignUpDTO } from "./dto/SignUpDTO";

@Controller()
export class AuthController {
  constructor(
    private service: AuthService
  ) {}

  @Post('sign-up')
  async signUp(@Body() signUpDTO: SignUpDTO): Promise<GetAuthDTO> {
    return await this.service.signUp(signUpDTO)
  }

  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<LoginResponseDTO> {
    return await this.service.login(loginDTO)
  }
}