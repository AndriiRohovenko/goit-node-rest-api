import multer from "multer";
import path from "node:path";
import HttpError from "../helpers/HttpError.js";

const tmpDir = path.resolve("tmp/uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".gif") {
    return cb(HttpError(400, "Only images are allowed"));
  }
  // if field is not existing
  if (!file.fieldname) {
    return cb(HttpError(400, "File field is missing"));
  }
  cb(null, true);
};

const upload = multer({ storage, limits, fileFilter });

export default upload;
