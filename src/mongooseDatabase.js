'use strict';

const mongoose = require('mongoose');

const dbLink = process.env.MONGODB_URI;

mongoose
  .connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log(`DB is connected an create on ${db.connection.host}`))
  .catch((error) => console.error(error));

mongoose.connection.on('open', () => {
  console.log(`Connected to MongoDB on Database: ${mongoose.connection.name}`);
});

mongoose.connection.on('error', (err) => {
  console.log('Error conexion', err);
  process.exit(1);
});

module.exports = mongoose.connection;
