import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { GetAuthDto } from "./dto/get-auth.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller()
export class AuthController {
  constructor(
    private service: AuthService
  ) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto): Promise<GetAuthDto> {
    return await this.service.signUp(signUpDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return await this.service.login(loginDto)
  }
}