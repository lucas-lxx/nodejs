const path = require('path');

const router = require('express').Router();

const root_dir_path = require('../util/path');

router.get('/', (req, res, next) => {
  res.sendFile(path.join(root_dir_path, 'views', 'home.html'))
});

module.exports = router;