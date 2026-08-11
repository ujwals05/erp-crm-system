import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import authRouter from "./routers/auth.router.js";
import { success } from "zod";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());

//
app.use("/api/v1/auth", authRouter);

app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "ERP Backend API is running",
    });
});

app.get("/health", (_req, res) => {
    res.json({
        success: true,
        message: "Server is active"
    })
})


export default app;