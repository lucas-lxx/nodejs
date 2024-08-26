const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, metaData]) => {
    res.render('shop/product-list', {
      products: rows,
      pageTitle: 'CatShop.com',
      path: '/products'
    });
  })
  .catch(err => { console.log(err); });
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
  .then(([rows, _]) => {
    const row = rows[0];
    res.render('shop/product-details', {
      product: row,
      pageTitle: row.title,
      path: '/products'
    });
  })
  .catch(err => { console.log(err); });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, _]) => {
    res.render('shop/index', {
      products: rows,
      pageTitle: 'CatShop.com', 
      path: '/'
    });
  })
  .catch(err => { console.log(err); });
}

exports.getCart = (req, res, next) => {
  Cart.fetchAll(cart => {
    res.render('shop/cart', {
      pageTitle: 'CatShop Cart',
      path: '/cart',
      products: cart.products,
      totalPrice: cart.totalPrice
    });
  })
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId
  Product.findById(productId)
  .then(([rows, _]) => {
    const row = rows[0];
    Cart.addProduct(row.id, row.price);
    res.redirect('/cart');
  })
  .catch(err => { console.log(err); });
}

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Cart.deleteById(productId, () => {
    res.redirect('/cart');
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'CatShop Checkout',
    path: '/checkout'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'CatShop Orders',
    path: '/orders'
  });
};