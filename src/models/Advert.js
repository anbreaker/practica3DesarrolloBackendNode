'use strict';

const {Schema, model} = require('mongoose');

const advertSchema = Mongoose.Schema(
  {
    name: {String, index: true, require: true},
    send: {Boolean, require: true},
    cost: {Number, require: true},
    imagePath: {String, require: true},
    create_at: {type: Date, default: Date.now},
    tags: ['tecnology', 'developer'],
  },
  {
    // Don't create index on production!!
    autoIndex: process.env.NODE_ENV !== 'production',
  }
);

module.exports = model(adevert, advertSchema);
