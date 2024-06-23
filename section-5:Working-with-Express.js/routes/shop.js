const express = require('express');

const admin_data = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = admin_data.products;
  res.render('shop', {products, doc_title: 'Shop'});
})

module.exports = router;