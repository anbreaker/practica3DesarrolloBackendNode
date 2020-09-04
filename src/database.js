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
