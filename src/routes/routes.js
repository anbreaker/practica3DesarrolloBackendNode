const {Router} = require('express');
const router = Router();

const Advert = require('../models/Advert');

router.get('/', async (req, res, next) => {
  res.render('index');
});

router.get('/newAdvert', (req, res) => {
  res.render('newAdvert');
});

module.exports = router;
