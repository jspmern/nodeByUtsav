//this is for the file upload file
let multer = require("multer");
let path=require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "image/"); // Upload images will be stored in the 'uploads/images/' directory
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });
  module.exports = upload;