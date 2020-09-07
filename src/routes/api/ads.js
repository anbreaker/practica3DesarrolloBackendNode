'use strict';

const {Router} = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const Advert = require('../../models/Advert');

// Multer use & Config Multer (middleware)
const storage = multer.diskStorage({
  destination: path.join(__dirname, './public/uploads'),
  filename: (req, file, callback, next) => {
    callback(null, uuid.v4() + path.extname(file.originalname));
  },
});

const multerMiddleware = multer({
  storage,
  dest: path.join(__dirname, './public/uploads'),
  limits: {fileSize: 1000000},
  fileFilter: (req, file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extensionName = filetypes.test(path.extname(file.originalname));
    if (mimetype && extensionName) {
      return callback(null, true);
    } else {
      callback('The file must be an image with the extension: jpeg | jpg | png | gif');
    }
  },
}).single('image');

router.get('/', async (req, res, next) => {
  // Preparar el error handler... para uso de next

  try {
    // Filters:
    const filter = {};
    if (req.query.name) filter.name = req.query.name;
    if (req.query.onSale) filter.onSale = req.query.onSale;
    if (req.query.cost) filter.cost = req.query.cost;
    if (req.query.imagePath) filter.imagePath = req.query.imagePath;
    if (req.query.tags) filter.tags = req.query.tags;

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
router.post('/', multerMiddleware, async (req, res, next) => {
  try {
    const {name, onSale, cost, imagePath, tags} = req.body;
    const newAdvert = new Advert({name, onSale, cost, imagePath, tags});

    const advert = await newAdvert.save();
    res.status(201).json(advert);
  } catch (error) {
    next(error);
  }
});

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

module.exports = router;
