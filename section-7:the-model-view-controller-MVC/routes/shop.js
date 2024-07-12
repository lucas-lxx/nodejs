const express = require('express');

const admin_data = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = admin_data.products;
  res.render('shop', {
    products, 
    pageTitle: 'CatShop.com',
    path: req.originalUrl
  });
})

module.exports = router;