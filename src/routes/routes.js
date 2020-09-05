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
  const {name, onSale, cost, imagePath, tags} = req.body;
  const newAdvert = new Advert({name, onSale, cost, imagePath, tags});

  await newAdvert.save();
  // res.json({message: 'Advert Save'});
  res.render('index');
});

module.exports = router;
