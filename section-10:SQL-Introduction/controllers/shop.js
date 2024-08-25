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
  const productUuid = req.params.productUuid;
  Product.findById(productUuid, product => {
    res.render('shop/product-details', {
      product,
      pageTitle: product.title,
      path: '/products'
    });
  });
}

exports.getHome = (req, res, next) => {
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
  const productUuid = req.body.productUuid
  Product.findById(productUuid, product => {
    Cart.addProduct(product.id, product.price);
    res.redirect('/cart');
  })
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