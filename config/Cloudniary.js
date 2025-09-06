import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config();

import fs from "fs"





const uplodaOnCd=async(filepath)=>{
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});

try {
    if(!filepath) {return null;}
    const uploadresult=await cloudinary.uploader.upload(filepath,{resource_type:'auto'})
    fs.unlinkSync(filepath)
    return uploadresult.secure_url
} catch (error) {
    fs.unlinkSync(filepath);
    console.log(error);
    return null
}
}


export default uplodaOnCd