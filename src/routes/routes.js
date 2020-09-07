'use strict';

const {Router} = require('express');
const router = Router();

const Advert = require('../models/Advert');

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/newAdvert', (req, res) => {
  res.render('newAdvert');
});

router.post('/newAdvert', async (req, res) => {
  const {name, onSale, cost, imagePath} = req.body;
  const tags = req.body.tags.split(' ');

  const newAdvert = new Advert({name, onSale, cost, imagePath, tags});

  // console.log(newAdvert);

  await newAdvert.save();
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
