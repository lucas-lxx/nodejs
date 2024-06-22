const path = require('path');

const router = require('express').Router();

const root_dir_path = require('../util/path');
const {products} = require('../routes/admin')

router.get('/', (req, res, next) => {
  res.sendFile(path.join(root_dir_path, 'views', 'home.html'))
  console.log(products)
});

module.exports = router;