import { SetMetadata } from "@nestjs/common";
import { Role } from "src/roles.enum";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles)

//custom decorator to associate guard with some routes