import {cloudinary} from "../config/Cloudniary.js";

const uploadOnCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer); // send buffer to Cloudinary
  });
};

export default uploadOnCloudinary;
