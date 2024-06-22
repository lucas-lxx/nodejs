const path = require('path');

const express = require('express');

const root_dir_path_path = require('../util/path');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(root_dir_path_path, 'views', 'add-product.html'));
})

router.post('/product', (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect('/');
})

exports.router = router;
exports.products = products;