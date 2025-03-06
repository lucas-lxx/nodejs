const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products => {
    res.render('shop/product-list', {
      products: products,
      pageTitle: 'CatShop.com',
      path: '/products'
    });
  })
  .catch(err => console.log(err))
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId)
  .then(product => {
    res.render('shop/product-details', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => { console.log(err); });
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(result => {
    res.render('shop/index', {
      products: result,
      pageTitle: 'CatShop.com', 
      path: '/'
    });
  })
  .catch(err => console.log(err));
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
  Product.findByPk(productId)
  .then(product => {
    Cart.addProduct(product.id, product.price);
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