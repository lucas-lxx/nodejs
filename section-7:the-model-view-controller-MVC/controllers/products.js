const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'CatShop Admin', 
    path: req.originalUrl
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({title: req.body.title});
  res.redirect('/shop');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    products, 
    pageTitle: 'CatShop.com',
    path: req.originalUrl
  });
};

module.exports = products;