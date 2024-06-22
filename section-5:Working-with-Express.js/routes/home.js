const path = require('path');

const router = require('express').Router();

const { views_dir_path } = require('../util/path');
const {products} = require('../routes/admin');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(views_dir_path, 'home.html'));
  console.log(products);
});

module.exports = router;