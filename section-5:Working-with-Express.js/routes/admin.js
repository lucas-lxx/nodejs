const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product');
})

router.post('/product', (req, res, next) => {
  products.push({title: req.body.title});
  console.log('routes/admin.js', 'products:', products)
  res.redirect('/shop');
})

exports.router = router;
exports.products = products;