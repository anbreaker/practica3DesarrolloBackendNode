const {Router} = require('express');
const router = Router();

const Advert = require('../models/Advert');

router.get('/', async (req, res, next) => {
  const advertsList = await Advert.find();
  res.json(advertsList);
});

module.exports = router;
