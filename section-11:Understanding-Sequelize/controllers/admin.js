const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    edit: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, image_url, description, price } = req.body;
  Product.create({
    title,
    image_url,
    price,
    description
  })
  .then(result => { 
    console.log(result); 
    res.redirect('/admin/add-product');
  })
  .catch(err => { console.log(err); });
};

exports.getEditProduct = (req, res, next) => {
  const edit = req.query.edit;
  const productId = req.params.productId;
  if (!edit) {
    return res.redirect('/');
  }
  Product.findById(productId)
  .then(([rows, _]) => {
    const row = rows[0];
    if (!row) {
      console.log('No product Found!');
      return res.redirect('error');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product',
      edit: edit,
      product: row
    });
  })
  .catch(err => { console.log(err); });
};

exports.postEditProduct = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedImage_url = req.body.image_url;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  const updatedProductId = req.body.productId;
  const updatedProduct = new Product(
    updatedTitle,
    updatedImage_url,
    updatedDescription,
    updatedPrice,
    updatedProductId
  );
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
  })
  Product.fetchAll()
  .then(([rows, _]) => {
    res.render('admin/products', {
      products: rows,
      pageTitle: 'Product Panel',
      path: '/admin/products'
    });
  })
  .catch(err => { console.log(err); });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
  .then((result) => {
    res.redirect('/admin/products');
  })
  .catch(err => { console.log(err); });
  
}

exports.deleteByTitle = (req, res, next) => {
  Product.deleteByTitle(req.params.title);
  res.status(204).end();
}