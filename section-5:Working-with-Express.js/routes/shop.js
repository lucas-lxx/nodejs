const path = require('path');

const express = require('express');

const { views_dir_path }= require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(views_dir_path, 'shop.html'));
})

module.exports = router;