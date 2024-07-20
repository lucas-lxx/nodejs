const router = require('express').Router();

const homeController = require('../controllers/home');
const productsController = require('../controllers/products');
const cartController = require('../controllers/cart');

router.get('/', homeController.getHome);

router.get('/products', productsController.getProducts);

router.get('/cart', cartController.getCart);

router.get('/checkout', cartController.getCheckout);

module.exports = router;