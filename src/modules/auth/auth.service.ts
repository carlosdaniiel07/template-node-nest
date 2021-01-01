import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { hashSync, compareSync } from "bcrypt"
import { sign, verify, decode } from "jsonwebtoken"

import { Auth } from "./auth.entity";
import { LoginDto } from "./dto/login.dto";
import { LoginResponseDto } from "./dto/login-response.dto";
import { ApiException } from "src/models/api-exception.model";
import { SignUpDto } from "./dto/sign-up.dto";
import { GetAuthDto } from "./dto/get-auth.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth) private repository: Repository<Auth>
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<GetAuthDto> {
    const { email, password, role } = signUpDto
    const auth = await this.repository.findOne({ where: { email } })

    if (auth) {
      throw new ApiException(400, `Já existe um usuário cadastrado com o e-mail ${email}`)
    }

    const createdAuth = await this.repository.save({ email, password: this.hashPassword(password), role })

    return { id: createdAuth.id, email }
  }

  async login(authDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = authDto
    const auth = await this.repository.findOne({ where: { email } })

    if (!auth) {
      throw new ApiException(404, `Nenhum usuário encontrado com o e-mail ${email}`)
    }

    if (!auth.isActive) {
      throw new ApiException(400, 'Usuário desativado')
    }

    if (!this.comparePassword(password, auth.password)) {
      throw new ApiException(400, 'Senha incorreta')
    }

    return { accessToken: this.generateAccessToken(auth) }
  }

  decodeAccessToken(accessToken: string): any {
    if (!accessToken) {
      return
    }

    try {
      verify(accessToken, 'my-jwt-secret')
      return decode(accessToken)
    } catch(err) {
      return
    }
  }

  private hashPassword(password: string): string {
    return hashSync(password, 10)
  }

  private comparePassword(password: string, encryptedPassword: string): boolean {
    return compareSync(password, encryptedPassword)
  }

  private generateAccessToken(auth: Auth): string {
    const { id, email, role } = auth
    return sign({ id, email, role }, 'my-jwt-secret', {
      issuer: 'nest-api',
      audience: 'nest -app',
      expiresIn: '24h'
    })
  }
}