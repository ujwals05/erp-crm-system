import type { UserRole } from "../generated/prisma/enums.js";
export interface JwtPayLoad {
    userId: string;
    email: string;
    role: UserRole;
}
//# sourceMappingURL=jwt.d.ts.map