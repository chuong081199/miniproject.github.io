const multer = require("multer")

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/image");
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + "-" + file.originalname);
    }
  });

  let uploadManyFiles = multer({storage: storage}).array("nameImage", 4);

  module.exports = uploadManyFiles