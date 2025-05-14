const Product = require('../models/product');
const Cart = require('../models/cart');
const { where } = require('sequelize');


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
  // req.user.getCart()
  // .then(cart => {
  //   return cart.getProducts()
  //   .then(products => {
  //     res.render('shop/cart', {
  //       pageTitle: 'CatShop Cart',
  //       path: '/cart',
  //       products: products,
  //       totalPrice: totalPrice  // Use calculated total price
  //     });
  //   })
  //   .catch(err => console.log(err));
  // })
  // .catch(err => console.log(err));

  req.user.getCart()
  .then(cart => {
    // console.log(JSON.stringify(cart, null, 2));
    cart.getProducts()
    .then(products => {
      // console.log("==============products==============");
      // console.log(products);
      // console.log("==============products==============");
      let sum = 0;
      // console.log("==============products inside the cart==============");
      // for (let i = 0; i < products.length; i++) {
      //   // const sum = sum + products[i].price;
      //   console.log(products[i]); 
      // }
      // console.log("==============products inside the cart==============");
      res.render('shop/cart', {
        pageTitle: 'CatShop Cart',
        path: '/cart',
        products: products,
        totalPrice: sum  // Use calculated total price
      });
    })
    .catch(e => console.log(e));
  })
  .catch(e => console.log(e));

};

exports.postCart = async (req, res, next) => {
  // const productId = req.body.productId
  // req.user.getCart()
  // .then(cart => {
  //   cart.getProducts({where: { id: productId}})
  //   .then(products => {
  //     console.log('==========');
  //     console.log(products);
  //     console.log('==========');
  //     prod = products[0];
  //     console.log(products);
  //     if (!prod) {
  //       Product.findByPk(productId, {raw: true})
  //       .then(prod => {
  //         console.log('==========');
  //         console.log("prod: ", prod);
  //         console.log('==========');
  //         cart.createProduct(prod.prod);
  //         return
  //       })
  //     }
  //     prod.quantity += 1;
  //     prod.save();
  //     res.redirect('/cart');
  //   })
  //   .catch(err => { console.log(err); });
  // })
  // .catch(err => { console.log(err); });

  const productId = req.body.productId
  let fetchedCart;

  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return fetchedCart.getProducts({where: { id: productId } });
  })
  .then(products => {
    let product;
    if (products) {
      product = products[0];
    }
    let newQuantity = 1;
    if (product) {
      // console.log("===asdf=======");
      // console.log("product: ", product);
      // console.log("quantity: ", product.cartItem.quantity);
      // console.log("===asdf=======");
      // product.cartItem.quantity += 1;
      // product.cartItem.save();
      // return
    }
    Product.findByPk(productId)
    .then(product => {
      console.log("product: ",product);
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity }});
    })
    .catch(e => console.log(e));
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(e => console.log(e));
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