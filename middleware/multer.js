import multer from "multer";

const storage = multer.memoryStorage(); // no local save
const upload = multer({ storage });

export default upload;
