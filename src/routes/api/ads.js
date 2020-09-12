'use strict';

const {Router} = require('express');
const router = Router();
const multerMiddlewareUploads = require('../../lib/multerMiddleware');
const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    // if (req.query.name) filter.name = req.query.name;
    if (req.query.name) filter.name = {$regex: '^' + `${req.query.name}`};
    if (req.query.onSale) filter.onSale = req.query.onSale;
    if (req.query.imagePath) filter.imagePath = req.query.imagePath;
    if (req.query.tags) filter.tags = {$all: req.query.tags};
    if (req.query.cost) filter.cost = filterCost(req.query.cost);

    const limit = parseInt(req.query.limit || 10);
    const skip = parseInt(req.query.skip || 0);

    const sort = req.query.sort;
    const select = req.query.select;

    const advertsList = await Advert.list(filter, limit, skip, sort, select);

    res.json(advertsList || []);
  } catch (error) {
    next(error);
  }
});

// To send data from PostMan
router.post(
  '/',
  (req, res, next) => {
    next();
  },
  multerMiddlewareUploads.single('image'),
  async (req, res, next) => {
    try {
      const {name, onSale, cost, tags} = req.body;
      const imagePath = req.file.filename;
      const newAdvert = new Advert({name, onSale, cost, imagePath, tags});

      const advert = await newAdvert.save();
      res.status(201).json(advert);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', async (req, res, next) => {
  try {
    await Advert.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const advert = await Advert.findById(req.params.id);
    res.json(advert);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const advertData = req.body;

    const advertSave = await Advert.findOneAndUpdate({_id: id}, advertData, {
      new: true,
    });

    res.json(advertSave);
  } catch (error) {
    next(error);
  }
});

const filterCost = (param) => {
  const splittedCost = param.split('-');

  if (splittedCost.length === 2) {
    if (splittedCost[0] !== '' && splittedCost[1] !== '')
      return {$gte: splittedCost[0], $lte: splittedCost[1]};
    if (splittedCost[0] !== '' && splittedCost[1] === '') return {$gte: splittedCost[0]};
    if (splittedCost[0] === '' && splittedCost[1] !== '') return {$lte: splittedCost[1]};
  } else {
    return splittedCost;
  }
};

module.exports = router;
