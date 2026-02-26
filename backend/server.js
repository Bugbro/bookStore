import express from "express";
import { configDotenv } from "dotenv";
import { connectDB } from "./src/config/connectDB.js";
import authRouter from "./src/routes/authRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import bookRouter from "./src/routes/bookRoutes.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(express.json());

//routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api//books", bookRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
});