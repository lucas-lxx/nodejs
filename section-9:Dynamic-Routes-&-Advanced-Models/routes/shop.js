const router = require('express').Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getHome);

router.get('/products', shopController.getProducts);

router.get('/products/:uuid', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

module.exports = router;