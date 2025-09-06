import uplodaOnCd from "../config/Cloudniary.js";
import User from "../models/User.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userid).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: `getCurrentUser error ${err}` });
  }
};

export const updateProife=async(req,res)=>{
  try {
    const userid=req.userid;
    const {description,name}=req.body;
    let photoUrl;
    if(req.file){
      photoUrl=await uplodaOnCd(req.file.path)
    }  
    const user=await User.findByIdAndUpdate(userid,{name,description,photoUrl});



    if(!user){
      return res.status(400).json({message:"user not found"});
    }

    return res.status(200).json(user)
   

  } catch (error) {
    console.log(`erro in updateProfile  cloudniary ${error}`);
    
  }
}