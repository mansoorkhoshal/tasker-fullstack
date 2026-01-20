const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  distination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

const uploads = multer({ storage });
module.exports = uploads;
