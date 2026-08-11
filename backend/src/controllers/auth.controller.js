import {} from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import { UserRole } from "../generated/prisma/client.js";
import { hashPassword } from "../utils/hash.js";
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        // 1. Validate mandatory fields
        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!email || typeof email !== "string" || email.trim() === "") {
            return res.status(400).json({ message: "Email is required" });
        }
        if (!password || typeof password !== "string" || password.length < 6) {
            return res.status(400).json({ message: "Password is required and must be at least 6 characters long" });
        }
        const normalizedEmail = email.trim().toLowerCase();
        // 2. Validate role if provided
        let userRole = UserRole.SALES;
        if (role) {
            if (!Object.values(UserRole).includes(role)) {
                return res.status(400).json({
                    message: `Invalid role. Allowed roles are: ${Object.values(UserRole).join(", ")}`
                });
            }
            userRole = role;
        }
        // 3. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
        });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
        // 4. Hash the password
        const hashedPassword = await hashPassword(password);
        // 5. Create user in database
        const user = await prisma.user.create({
            data: {
                name: name.trim(),
                email: normalizedEmail,
                password: hashedPassword,
                role: userRole
            }
        });
        // 6. Omit sensitive fields from response
        const { password: _, refreshToken: __, ...safeUser } = user;
        return res.status(201).json({
            message: "User registered successfully",
            user: safeUser
        });
    }
    catch (error) {
        console.error("Error in registerUser:", error);
        return res.status(500).json({
            message: "Internal server error during registration",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};
//# sourceMappingURL=auth.controller.js.map