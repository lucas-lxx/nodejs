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