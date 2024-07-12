exports.getHome = (req, res, next) => {
  res.render('home', {
    pageTitle: 'CatShop.com', 
    path: req.originalUrl
  });
}