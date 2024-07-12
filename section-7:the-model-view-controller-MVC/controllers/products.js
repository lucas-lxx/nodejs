const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'CatShop Admin', 
    path: req.originalUrl
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/shop');
};

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop', {
    products, 
    pageTitle: 'CatShop.com',
    path: req.originalUrl
  });
};