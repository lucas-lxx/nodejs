const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();
// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);
// /admin/products => GET
router.get('/products', adminController.getProducts);
// /admin/product => POST
router.post('/product', adminController.postAddProduct);

router.delete('/product/:title', adminController.deleteByTitle);

module.exports = router;