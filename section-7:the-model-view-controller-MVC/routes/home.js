const router = require('express').Router();

const homeController = require('../controllers/home');
const productsController = require('../controllers/products');

router.get('/', homeController.getHome);

router.get('/products', productsController.getProducts);

module.exports = router;