const router = require('express').Router();

const shopController = require('../controllers/shop');
const productsController = require('../controllers/products');

router.get('/', shopController.getHome);

router.get('/products', productsController.getProducts);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout);

module.exports = router;