import express from  "express";
import dotenv from "dotenv";
import mongodb from "./config/Connect.db.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/Auth.Route.js";
import cors from "cors";
import userRouter from "./route/User.Route.js";
import courseRouter from "./route/Course.Route.js"
dotenv.config();

const PORT=process.env.PORT || 8080;


const app=express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:"https://anil-course-bloger.netlify.app",
  credentials:true
}))
app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  next();
});
app.use("/api/auth",authRouter);
app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)

app.get("/",(req,res)=>{
    res.send("hello from server");
})

app.listen(PORT,()=>{
    console.log(`server is listen ${PORT} `)

mongodb();
})