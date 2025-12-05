import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import dbConnection from "./config/dbConnection.js";

dotenv.config()

const port = process.env.PORT ||  6759;
const app = express();

app.use(express.json());
app.use(cors())

app.use("/api/user",userRoutes)

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port: ${port}`);
});
dbConnection();
