const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'CatShop Admin', 
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  const requiredFields = { title, description, price };
  let invalidFieldSize = false;
  for (const [key, value] of Object.entries(requiredFields)) {
    if (value.length < 1) {
      invalidFieldSize = true;
    }
  }
  if (invalidFieldSize) {
    res.redirect('/admin/add-product');
  } else {
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/products');
  }
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products,
      pageTitle: 'Product Panel',
      path: '/admin/products'
    });
  })
};

exports.deleteByTitle = (req, res, next) => {
  Product.deleteByTitle(req.params.title);
  res.status(204).end();
}