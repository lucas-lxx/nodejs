const path = require('path');

const express = require('express');

const root_dir_path = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(root_dir_path, 'views', 'shop.html'));
})

module.exports = router;