import { UserRole } from "../generated/prisma/enums.js";

export interface RegisterInputs {
    name: string
    username: string
    email: string
    password: string
    role?: UserRole
}