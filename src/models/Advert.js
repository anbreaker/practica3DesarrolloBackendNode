'use strict';

const {Schema, model} = require('mongoose');

const advertSchema = new Schema(
  {
    name: {
      type: String,
      index: true,
      required: true,
    },
    onSale: {
      type: Boolean,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    imagePath: {
      type: String,
      required: true,
    },
    tags: ['tecnology', 'developer', 'work', 'lifestyle'],
  },
  {
    // Don't create index on production!!
    autoIndex: process.env.NODE_ENV !== 'production',
  }
);

module.exports = model('advert', advertSchema);
