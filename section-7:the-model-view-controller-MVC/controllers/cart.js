exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'CatShop Cart',
    path: req.originalUrl
  });
};