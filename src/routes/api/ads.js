'use strict';

const {Router} = require('express');
const router = Router();

const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
  // Preparar el error handler... para uso de next

  try {
    const advertsList = await Advert.find();
    // Filters:
    res.json(advertsList);
  } catch (error) {
    next(error);
  }
});

// To send data from PostMan
router.post('/', async (req, res, next) => {
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

// why??
router.put('/:_id', async (req, res, next) => {
  try {
    const _id = req.params._id;
    const advertData = req.body;

    const advertSave = await Advert.findOneAndUpdate({_id}, advertData, {
      new: true,
      useFindAndModify: false, // To up Mongoose on the future (warning)
    });

    res.json({reusult: advertSave});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
