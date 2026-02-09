import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/", (req, res)=>{
    console.log("Hello world.........");
});

app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
});