'use strict';

const {Schema, model, Mongoose} = require('mongoose');

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
      required: false,
    },
    tags: ['tecnology', 'developer', 'work', 'lifestyle'],
  },
  {
    // Don't create index on production!!
    autoIndex: process.env.NODE_ENV !== 'production',
  }
);

// Static Methods
advertSchema.statics.list = function (param, limit, skip, sort, fields) {
  const query = Advert.find(param);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.fields(fields);
  query.exec();
};

const Advert = model('Advert', advertSchema);

module.exports = Advert;
