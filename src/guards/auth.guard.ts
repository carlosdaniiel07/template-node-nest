import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { ApiException } from "src/models/api-exception.model";

import { AuthRole } from "src/modules/auth/auth-role.enum";
import { AuthService } from "src/modules/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector, private authService: AuthService
  ) {}
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>()
    const authorizedRoles = this.reflector.get<AuthRole[]>('roles', context.getHandler())
    const authorization = req.headers.authorization
   
    if (!authorization) {
      throw new ApiException(401, 'Você não está logado')
    }

    const decodedToken = this.authService.decodeAccessToken(authorization.substring(7))

    if (!decodedToken) {
      throw new ApiException(401, 'Você não está logado')
    }

    const { role } = decodedToken

    if (authorizedRoles && !authorizedRoles.includes(role)) {
      throw new ApiException(403, 'Você não está autorizado a acessar este recurso')
    }

    return true
  }
}