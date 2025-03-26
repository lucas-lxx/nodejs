const Product = require('../models/product');
const Cart = require('../models/cart');

const { Sequelize } = require('sequelize');

exports.getProducts = async (req, res, next) => {
  Product.findAll({raw: true})
  .then(products => {
    res.render('shop/product-list', {
      products: products,
      pageTitle: 'CatShop.com',
      path: '/products'
    });
  })
  .catch(err => console.log(err))
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.productId;
  Product.findByPk(productId, {raw: true})
  .then(product => {
    res.render('shop/product-details', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => { console.log(err); });
}

exports.getIndex = async (req, res, next) => {
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

exports.getCart = async (req, res, next) => {
  // Cart.findAll({raw: true})
  // .then(async cart => {
  //   console.log(cart);
  //   res.render('shop/cart', {
  //     pageTitle: 'CatShop Cart',
  //     path: '/cart',
  //     products: cart,
  //     totalPrice: 99
  //   });
  // })
  //Cart.findAll({

  // Cart.findAll({
  //   raw: true,
  //   include: [{
  //     model: Product,  // Assuming a Product model is associated with Cart
  //     attributes: ['price']  // We need the price of each product
  //   }]
  // })
  // .then(async cart => {
  //   console.log(cart);

  //   // Calculate total price in JavaScript
  //   const totalPrice = cart.reduce((sum, item) => sum + item['Product.price'], 0);  // Assuming the join adds 'Product.price'

  //   res.render('shop/cart', {
  //     pageTitle: 'CatShop Cart',
  //     path: '/cart',
  //     products: cart,
  //     totalPrice: totalPrice  // Use calculated total price
  //   });
  // })
  // .catch(err => console.log(err));

  Cart.findAll({
    raw: true,
    include: [{
      model: Product,  // Assuming you have a Product model related to Cart
      attributes: []   // We don't need Product details in the result
    }],
    attributes: [
      [Sequelize.fn('SUM', Sequelize.col('Product.price')), 'totalPrice']  // Calculate total price
    ],
    group: ['Cart.id']
  })
  .then(async cart => {
    console.log(cart);  // [{ totalPrice: 123.45 }]
    // res.render('shop/cart', {
    //   pageTitle: 'CatShop Cart',
    //   path: '/cart',
    //   products: ,
    //   totalPrice: cart[0].totalPrice  // Access the calculated totalPrice
    // });
    res.send('ok!');
  })
  .catch(err => console.log(err));


};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId
  Product.findByPk(productId)
  .then(product => {
    Cart.create({product_id: productId, quantity: (product.quantity += 1)})
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