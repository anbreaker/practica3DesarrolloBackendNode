'use strict';

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

// Initializations
const app = express();

// Conecto to Database
require('./mongoose_database');

// Settings
app.set('port', process.env.PORT || 4000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// Middlewares
app.use(morgan('dev'));

// Multer use & Config Multer (middleware)
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

// Static files
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Routes on './routes/routes.js' && './routes/api/routes.adverts'
app.use('/', require('./routes/routes'));
app.use('/api/ads', require('./routes/api/ads'));

// 404 Handler Error
app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

// Start the server on './index.js'

module.exports = app;
