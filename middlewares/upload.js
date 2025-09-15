import multer from "multer";
import path from "path";
import createError from "http-errors";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1000 * 1000 * 5,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return cb(new createError.BadRequest("Extension .exe not allow."));
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
