import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./src/config/connectDB.js";
import authRouter from "./src/routes/authRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";
import cartRouter from "./src/routes/cartRoutes.js";
import bookRouter from "./src/routes/bookRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import newsLetterRouter from "./src/routes/newsLetterRoutes.js";
import contactRouter from "./src/routes/contactRoutes.js";
import connectCloudinary from "./src/config/cloudinary.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { initSocket } from "./src/sockets/socketManager.js";
import { contactLimiter } from "./src/middleware/rateLimiter.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

const server = http.createServer(app);

//cors setup for admin and frontend
const allowedOrigins = [
  "https://book-store-puce-seven.vercel.app/",
  // "http://localhost:5173",
  // "http://localhost:5174",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/cart", cartRouter);
app.use("/api/books", bookRouter);
app.use("/api/orders", orderRouter);
app.use("/api/newsletter", newsLetterRouter);
app.use("/api/contact", contactLimiter, contactRouter);

//setup socket io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

initSocket(io);

server.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});