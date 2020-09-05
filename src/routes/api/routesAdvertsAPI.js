const {Router} = require('express');
const router = Router();

const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
  const advertsList = await Advert.find();
  res.json(advertsList);
});

// To send data from PostMan
router.post('/', async (req, res) => {
  // console.log(req.body);
  const {name, onSale, cost, imagePath, tags} = req.body;
  const newAdvert = new Advert({name, onSale, cost, imagePath, tags});

  await newAdvert.save();
  res.json({message: 'Advert Save'});
});

router.delete('/:id', async (req, res) => {
  // console.log(req.params.id);
  const adverts = await Advert.findByIdAndDelete(req.params.id);
  res.json({message: 'Advert Deleted'});
});

module.exports = router;
