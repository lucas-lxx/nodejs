const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    edit: false
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
    product.save()
    .then(() => { res.redirect('/products'); })
    .catch(err => { console.log(err); });
  }
};

exports.getEditProduct = (req, res, next) => {
  const edit = req.query.edit;
  const productId = req.params.productId;
  if (!edit) {
    return res.redirect('/');
  }
  Product.findById(productId, (product) => {
    if (!product) {
      console.log('No product Found!');
      return res.redirect('error');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product',
      edit: edit,
      product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  const updatedProductUuid = req.body.productId;
  const updatedProduct = new Product(
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice,
    updatedProductUuid
  );
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products,
      pageTitle: 'Product Panel',
      path: '/admin/products'
    });
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const ProductUuid = req.body.productId;
  console.log(ProductUuid);
  Product.deleteById(ProductUuid);
  res.redirect('/admin/products');
}

exports.deleteByTitle = (req, res, next) => {
  Product.deleteByTitle(req.params.title);
  res.status(204).end();
}