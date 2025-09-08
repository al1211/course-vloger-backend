
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const getToken = (userid) => {
  
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  // jwt.sign here is synchronous
  const token = jwt.sign({ userid }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

export default getToken;
