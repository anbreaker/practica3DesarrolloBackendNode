const {Router} = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.json({text: 'hello world'});
  // res.send('hola mundo!');
});

router.get('/paramenruta/:etiqueta', (req, res, next) => {
  console.log(req.params);
  res.send('ok');
});
router.get('/paramenruta/:para?', (req, res, next) => {
  console.log(req.params);
  res.send('ok 2');
});

module.exports = router;
