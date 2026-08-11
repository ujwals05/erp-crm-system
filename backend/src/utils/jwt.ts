import jwt from "jsonwebtoken";
import type { UserRole } from "../generated/prisma/enums.js";

export interface JwtPayLoad {
    userId: string;
    email: string;
    role: UserRole;
}