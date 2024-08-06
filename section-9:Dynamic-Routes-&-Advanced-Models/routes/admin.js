const express = require('express');

const adminController = require('../controllers/admin');
const { route } = require('./shop');

const router = express.Router();
// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);
// /admin/products => GET
router.get('/products', adminController.getProducts);
// /admin/product => POST
router.post('/product', adminController.postAddProduct);

router.delete('/product/:title', adminController.deleteByTitle);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

module.exports = router;