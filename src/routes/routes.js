'use strict';

const {Router} = require('express');
const router = Router();

const Advert = require('../models/Advert');

router.get('/', async (req, res, next) => {
  try {
    const adverts = await Advert.find();
    res.render('index', {adverts});
    // res.json(adverts);
  } catch (error) {
    next(error);
  }
});

router.get('/newAd', (req, res) => {
  res.render('newAd');
});

router.post('/newAd', async (req, res) => {
  const {name, onSale, imagePath, cost} = req.body;
  const tags = req.body.tags.split(' ');

  // ¿Como guardo la ruta de la imagen que subo y xq no se guarda en la carpeta?

  const newAdvert = new Advert({name, onSale, cost, imagePath, tags});

  const advert = await newAdvert.save();
  // res.json({message: 'Advert Save'});
  res.redirect('/api/ads');
});

router.get('/delete', (req, res) => {
  res.render('deleteAdvert');
});

router.get('/update', (req, res) => {
  res.render('updateAdvert');
});

module.exports = router;
