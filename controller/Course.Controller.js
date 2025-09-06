import uplodaOnCd from "../config/Cloudniary.js";
import Courses from "../models/Course.model.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    console.log(req.body);
    if (!title || !category) {
      return res.status(400).json({ message: "title or category is required" });
    }
    console.log(req.body)
    const course = await Courses.create({
      title,
      category,
      creator: req.userid,
    });
    return res.status(201).json(course);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in course controller" });
  }
};

export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await Courses.find({ isPublished: true });
    if (!courses) {
      return res.status(401).json({ message: "Courses in not found" });
    }

    return res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in getcourse controller" });
  }
};


export const getCreatorCourses=async(req,res)=>{
    try{
        const userid=req.userid;
        const courses=await Courses.find({creator:userid})
          if(!courses){
             return res.status(401).json({ message: "Courses in not found" });
          }
           return res.status(200).json(courses);
    }catch(err){
        console.log(err);
    return res.status(500).json({ message: "error in createcourses controller" });
    }
};


export const editCourses=async(req,res)=>{
    try{
      const {courseId}=req.params;
      const {title,subtitle,description,catrgory,level,price,isPublished}=req.body;
      console.log(req.body);
      console.log(req.file)
      let thumbnail;
      if(req.file){
        thumbnail=await uplodaOnCd(req.file.path)
      }
      console.log("thumbanil",thumbnail);
      let course=await Courses.findById(courseId);
      if(!course){
        return res.status(400).json({message:"Course is not found"});
      }
     const updateData={title,subtitle,description,catrgory,level,price,isPublished,thumbnail};
     

     course=await Courses.findByIdAndUpdate(courseId,updateData,{new:true});

     res.status(201).json(course);
    }catch(err){
   console.log(err);
   return res.status(500).json({message:"edit course error"});
    }
}


export const getCoursebyId=async(req,res)=>{
    try {
        const {courseId}=req.params;
        console.log("funciotn calling ",courseId);
     
        let course=await Courses.findById(courseId);
        console.log(course);
        if(!course){
            return res.status(400).json({message:"course is not found"})
        };
        return res.status(200).json(course);
    } catch (err) {
       console.log(err);
   return res.status(500).json({message:"getcourse by id course error"}); 
    }
};

export const removeCourse=async(req,res)=>{
    try{
   const {courseId}=req.params;
   let course=await Courses.findById(courseId);
      if(!course){
         return res.status(400).json({message:"course is not found"})
      }

      course=await Courses.findByIdAndDelete(courseId,{new:true});

      return res.status(200).json({message:"succesfull course delete"});
    }catch(err){
    console.log(err);
   return res.status(500).json({message:"failed to delete  course error"}); 
    }
}