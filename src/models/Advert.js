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

// Static Methods
advertSchema.statics.list = function (filter, limit, skip, sort, select) {
  const query = Advert.find(filter);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(select);
  return query.exec();
};

const Advert = model('Advert', advertSchema);

module.exports = Advert;
