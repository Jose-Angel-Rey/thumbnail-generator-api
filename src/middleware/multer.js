const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

function uploadFile() {
  const storage = multer.diskStorage({
    destination: path.join(__dirname, "../../public/uploads"),
    filename: function (req, file, cb) {
      const fileExtension = file.originalname.split(".").pop().toLowerCase();
      cb(null, `${uuidv4()}.${fileExtension}`);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
      const fileTypes = /jpeg|png/;
      const mimetype = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      if (mimetype && extname) return cb(null, true); 
      cb(
        "Error: File upload only supports the following file types - " +
          fileTypes
      );
    },
  }).single("file");

  return upload;
}

module.exports = uploadFile;
