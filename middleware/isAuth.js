import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"

const isAuth=async(req,res,next)=>{
    try{

        let {token} = req.cookies;
        if(!token){
            return res.status(400).json({message:"User have no token"});
            
        }
        let verify=await jwt.verify(token,process.env.JWT_SECRET) ;

      
        if(!verify){
            return res.status(400).json({message:"User does not valid token"});
        }
        req.userid = verify.userid || verify.id || verify._id;
        next();
    }catch(err){
    return res.status(500).json({message:`Middleware error ${err}`})
    }

};

export default isAuth