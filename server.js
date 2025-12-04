import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import dbConnection from "./config/dbConnection.js";

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json());
app.use(cors())

app.use("/api/user",userRoutes)


dbConnection();
app.listen(PORT, ()=>{
    console.log(`App running on port: ${PORT}`)
})
