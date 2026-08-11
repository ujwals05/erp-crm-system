import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", authRouter);
app.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "ERP Backend API is running",
    });
});
export default app;
//# sourceMappingURL=app.js.map