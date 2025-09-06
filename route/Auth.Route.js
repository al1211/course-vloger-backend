import express from "express";
import { googleAuth, login, logout, otpVerify, resetPassword, senOTP, singUp } from "../controller/Auth.Controller.js";

const authRouter = express.Router();

authRouter.post("/signup", singUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/sendotp", senOTP);
authRouter.post("/verifyotp", otpVerify);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/googleauth",googleAuth)
console.log("otpVerify in router:", otpVerify);  // debugging

export default authRouter;

