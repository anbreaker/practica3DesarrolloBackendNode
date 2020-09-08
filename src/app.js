'use strict';

const express = require('express');
const morgan = require('morgan');
const path = require('path');

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

// Form sends data, understand it, but not accept images etc...(Method of Express)
app.use(express.urlencoded({extended: true}));

// Config Express Data
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Website Routes on './routes/routes.js'
app.use('/', require('./routes/routes'));

// API's Routres './routes/api/routes.adverts';
app.use('/api/ads', require('./routes/api/ads'));

// 404 Handler Error
// app.use((req, res, next) => {
//   res.status(404).send('404 Not Found');
// });
app.use(require('./handlerError').notFound);

app.use(require('./handlerError').InternalServerError);

// Start the server on './index.js'

module.exports = app;
