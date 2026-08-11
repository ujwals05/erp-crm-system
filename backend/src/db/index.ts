// import prisma from "./prisma.js";
import prisma from "../lib/prisma.js";

export async function connectDB() {
    try {
        await prisma.$connect();

        console.log("✅ Database connected successfully");

        return true;
    } catch (error) {
        console.error("❌ Database connection failed");
        console.error(error);

        return false;
    }
}