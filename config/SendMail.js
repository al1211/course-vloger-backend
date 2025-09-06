import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config();


const transporter = nodemailer.createTransport({
  service:"gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user:process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail=async(to,otp)=>{
  try{

    await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: to,
        subject: "Reset your password",
        text: "Hello world?", // plain‑text body
        html: `<p>Your OTP for password Reset is <b>${otp}</b> its expire in 5 minutes.</p>`, // HTML body
      });
      console.log("Mail sent")
  }catch(err){
    console.error("mail sent error",err);
    throw err;
  }
};

export default sendMail