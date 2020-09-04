const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

console.log(process.env.PORT);

// Middlewares
app.use(morgan('dev'));

// Middlewares multer use
// Config Multer
const storage = multer.diskStorage({
  destination: path.join(__dirname, './public/uploads'),
  filename: (req, file, callback, next) => {
    callback(null, uuid.v4() + path.extname(file.originalname));
  },
});

app.use(
  multer({
    storage,
    dest: path.join(__dirname, './public/uploads'),
    limits: {fileSize: 1000000},
    fileFilter: (req, file, callback) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extensionName = filetypes.test(path.extname(file.originalname));
      if (mimetype && extensionName) {
        return callback(null, true);
      } else {
        callback('The file must be an image with the extension: jpeg | jpg | png | gif');
      }
    },
  }).single('image')
);

// Form sends data, understand it, but not accept images etc...(Method of Express)
app.use(express.urlencoded({extended: false}));

// Config Express Data
app.use(express.json());

// Routes
app.use('/api/advert', require('./routes/routes'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// Static files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Start the server
app.listen(app.get('port'), () => {
  console.log('Server on por', app.get('port'));
});

module.exports = app;
