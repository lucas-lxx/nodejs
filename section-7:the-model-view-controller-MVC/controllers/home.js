exports.getHome = (req, res, next) => {
  res.render('shop/index', {
    pageTitle: 'CatShop.com', 
    path: req.originalUrl
  });
}