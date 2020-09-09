'use stric';

const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

// Multer use & Config Multer (middleware)
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, callback, next) => {
    callback(null, uuid.v4() + path.extname(file.originalname));
  },
});

const multerMiddlewareUploads = multer({
  storage,
  dest: path.join(__dirname, '../public/uploads'),
  limits: {fileSize: 1000000},
  fileFilter: (req, file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extensionName = filetypes.test(path.extname(file.originalname));
    if (mimetype && extensionName) {
      return callback(null, true);
    } else {
      callback(
        console.log(
          '\t\nThe file must be an image with the extension: jpeg | jpg | png | gif\n'
        )
      );
    }
  },
});

module.exports = multerMiddlewareUploads;
