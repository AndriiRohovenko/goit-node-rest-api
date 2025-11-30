import multer from "multer";

const FileUploadErrorHandler = (err, req, res, next) => {
  // Handle Multer errors first -> 400
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: `File upload error: ${err.message}`,
      data: { code: err.code, field: err.field },
    });
  }
  next(err);
};

export default FileUploadErrorHandler;
