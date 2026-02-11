import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./src/config/connectDB.js";
import authRouter from "./src/routes/authRoutes.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());

//routes
app.use("/api/auth", authRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
});