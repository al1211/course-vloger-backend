import expres from "express"
import isAuth from "../middleware/isAuth.js";
import { getCurrentUser, updateProife } from "../controller/User.Controller.js";
import upload from "../middleware/multer.js"
const userRouter=expres.Router();

userRouter.get("/getcurrentuser",isAuth,getCurrentUser);
userRouter.post("/profile",isAuth,upload.single("photoUrl"),updateProife)




export default userRouter