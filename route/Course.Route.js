import express from "express"
import { createCourse, editCourses, getCoursebyId, getCreatorCourses, getPublishedCourse, removeCourse } from "../controller/Course.Controller.js";
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js";
const courseRouter=express.Router();

courseRouter.post("/create",isAuth,createCourse)
courseRouter.get("/getpublished",getPublishedCourse);
courseRouter.get("/getcreator",isAuth,getCreatorCourses);
courseRouter.post("/editCourse/:courseId",isAuth,upload.single("thumbnail"),editCourses);
courseRouter.get("/getcoursebyid/:courseId",isAuth,getCoursebyId);
courseRouter.delete("/delete/:courseId",isAuth,removeCourse)

export default courseRouter
