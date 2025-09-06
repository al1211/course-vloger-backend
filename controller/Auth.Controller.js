import sendMail from "../config/SendMail.js";
import getToken from "../config/token.js";
import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import validator from "validator";

export const otpVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    console.log("otpVerify controller called", email, otp);

    const user = await User.findOne({ email });

    if (!user || user.resetOtp != otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid otp" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpire = undefined;

    await user.save();
    res.status(200).json({ message: "Otp verified successfully" });
  } catch (err) {
    return res.status(500).json({ message: `verify otp err ${err}` });
  }
};
export const singUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
   
    const isAlreadexit = await User.findOne({ email });
    if (isAlreadexit) {
      return res.status(400).json({ message: "User Already Exits" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "This email is not valid" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter strong password" });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });
    let token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    await user.save();
    res.status(201).json({user,token});
  } catch (err) {
    return res.status(500).json({ message: `SingupError ${err}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userfind = await User.findOne({ email });

    if (!userfind) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isComparePassword = await bcrypt.compare(password, userfind.password);
    if (!isComparePassword) {
      return res.status(400).json({ message: "Invalid Username and password" });
    }

    const token = getToken(userfind._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(userfind);
  } catch (err) {
    return res.status(500).json({ message: `Login err ${err}` });
  }
};

export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: `Logout succesfull` });
  } catch (err) {
    return res.status(500).json({ message: `Logout error ${err}` });
  }
};

export const senOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();

    await sendMail(email, otp);

    res.status(200).json({ message: "OTP send susscesfull" });
  } catch (err) {
    return res.status(500).json({ message: `send otp err ${err}` });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isOtpVerified) {
      return res.status(404).json({ message: "Otp verification is required" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;
    await user.save();
    res.status(200).json({ message: "OTP verified succesfully" });
  } catch (err) {
    return res.status(500).json({ message: `ressetpasword err ${err} ` });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        role,
      });
    }
    let token = await getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json(user);
  } catch (err) {
    console.error("Google Auth error:", err); // <-- this shows real error in backend terminal
    return res
      .status(500)
      .json({ message: `Google Auth error: ${err.message}` });
  }
};
