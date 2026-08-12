import type { RegisterInputs } from "../types/auth.types.js";
// import { Prisma } from "../generated/prisma/client.js";
import prisma from "../lib/prisma.js";

const registerUserService = async (data: RegisterInputs) => {
    const { name, username, email, password, role } = data;

    const exisitingUser = await prisma.user.findUnique({
        where: { email }
    });

    if(exisitingUser){
        
    }
}