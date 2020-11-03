import { SetMetadata } from "@nestjs/common";
import { AuthRole } from "src/modules/auth/auth-role.enum";

export const Roles = (...roles: AuthRole[]) => SetMetadata('roles', roles)