import mongoose from "mongoose";


const courseSchema=new mongoose.Schema({
title:{
    type:String,
    required:true
},
subtitle:{
    type:String,
},
description:{
    type:String
},
category:{
    type:String,
    required:true

},
level:{
    type:String,
    enum:["Beginner","Intermidiate","Advanced"],

},
price:{
    type:Number,

},
thumbnail:{
    type:String
},
enrolledStudents:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
}],
lectures:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Lecture"
    }
],
creator:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
isPublished:{
    type:Boolean,
    default:false,
},
reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
}]
},{timestamps:true});


const Courses=mongoose.model("Course",courseSchema);
export default Courses