const router = require('express').Router();

router.get('/', (req, res, next) => {
  console.log(req.originalUrl);
  res.render('home', {
    pageTitle: 'CatShop.com', 
    path: req.originalUrl
  });
});

module.exports = router;