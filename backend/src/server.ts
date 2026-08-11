import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./db/index.js";

const PORT = process.env.PORT || 5000;



const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);

        });

    } catch (error) {
        console.log("Failed to start the server", error);
        // throw error;
        process.exit(1)
    }
}

startServer();