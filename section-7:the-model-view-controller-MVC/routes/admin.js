const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);

router.post('/product', productsController.postAddProduct);

router.get('/products', productsController.getAdminProducts);

module.exports = router;