import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const authToken = (userId) => {
    return jwt.sign(
        { id: userId },                         
        process.env.JWT_SECRET,              
        { expiresIn: process.env.JWT_EXPIRES_IN || "10m" }
    );
};

export default authToken;
