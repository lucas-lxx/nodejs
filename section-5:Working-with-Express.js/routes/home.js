const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('home', {doc_title: 'CatShop'});
});

module.exports = router;