import mongoose from "mongoose";
 const mongodb=async()=>{
    try{
    const connec=await mongoose.connect(process.env.MONGO_URI);
    if(connec){
        console.log(`mongoose connect); ${process.env.MONGO_URI}`)
    }else{
        console.log("mongoose not connect");
    }
    }catch(err){
        console.log(err);
    }
};

export default mongodb;

