const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products, 
      pageTitle: 'CatShop.com',
      path: req.originalUrl
    });
  });
};

exports.getProduct = (req, res, next) => {
  const productUuid = req.params.uuid;
  Product.findById(productUuid, product => {
    console.log(product);
  });
  res.status(200).redirect('/products');
}

exports.getHome = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'CatShop.com', 
    path: req.originalUrl
  });
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'CatShop Cart',
    path: req.originalUrl
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'CatShop Checkout',
    path: req.originalUrl
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'CatShop Orders',
    path: req.originalUrl
  });
};