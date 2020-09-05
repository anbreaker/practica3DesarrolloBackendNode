'use strict';

const {Schema, model} = require('mongoose');

const advertSchema = Mongoose.Schema(
  {
    name: {String, index: true, require: true},
    onSale: {Boolean, require: true},
    cost: {Number, require: true},
    imagePath: {String, require: true},
    tags: ['tecnology', 'developer', 'work', 'lifestyle'],
  },
  {
    // Don't create index on production!!
    autoIndex: process.env.NODE_ENV !== 'production',
  }
);

module.exports = model(adevert, advertSchema);
