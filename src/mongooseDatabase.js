'use strict';

const mongoose = require('mongoose');

const dbLink = process.env.MONGODB_URI;

mongoose
  .connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((db) => console.log('DB is conneted an create on', db.connection.host))
  .catch((error) => console.error(error));

mongoose.connection.on('open', () => {
  console.log('Conectado a MongoDB en', mongoose.connection.name);
});

mongoose.connection.on('error', (err) => {
  console.log('Error de conexión', err);
  process.exit(1);
});

module.exports = mongoose.connection;
