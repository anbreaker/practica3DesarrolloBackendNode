const {Router} = require('express');
const router = Router();

const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
  const advertsList = await Advert.find();

  // Filtros

  res.json(advertsList);
});

// To send data from PostMan
router.post('/', async (req, res) => {
  // console.log(req.body);
  const {name, onSale, cost, imagePath, tags} = req.body;
  const newAdvert = new Advert({name, onSale, cost, imagePath, tags});

  const advert = await newAdvert.save();
  res.status(201).json(advert);
});

router.delete('/:id', async (req, res) => {
  // console.log(req.params.id);
  await Advert.findByIdAndDelete(req.params.id);
  res.status(204).json();
});

router.get('/:id', async (req, res) => {
  const advert = await Advert.findById(req.params.id);
  res.json(advert);
});

module.exports = router;
