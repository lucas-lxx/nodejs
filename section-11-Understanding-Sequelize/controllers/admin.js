const Product = require('../models/product');

exports.getAddProduct = async (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product', 
    path: '/admin/add-product',
    edit: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  let { title, image_url, description, price } = req.body;
  console.log(req.body);
  if (image_url === '') image_url = "https://preview.redd.it/toea7o9mmk481.jpg?width=1080&crop=smart&auto=webp&s=ff47ea91395dacbc8eb8a214a63d7f1d3e1b307a";
  req.user.createProduct({
  // Product.create({
    title,
    image_url,
    price,
    description
  })
  .then(result => { 
    res.redirect('/admin/products');
  })
  .catch(err => { console.log(err); });
};

exports.getEditProduct = async (req, res, next) => {
  const edit = req.query.edit;
  const productId = req.params.productId;
  if (!edit) {
    return res.redirect('/');
  }
  req.user.getProducts({where: {id: productId}})
  // Product.findByPk(productId)
  .then(products => {
    const product = products[0];
    if (!product) {
      console.log('No product Found!');
      return res.redirect('error');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product', 
      path: '/admin/edit-product',
      edit: edit,
      product: product 
    });
  })
  .catch(err => { console.log(err); });
};

exports.postEditProduct = async (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImage_url = req.body.image_url;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;
  // Product.findByPk(req.body.productId)
  req.user.getProducts({where: {id: productId}})
  .then(prod => {
    prod = prod[0];
    console.log("========", JSON.stringify(prod), "========");
    // req.user.getProducts({where: {id: productId}})
    // .then(p => {console.log(JSON.stringify(p))})
    // .catch(e => {console.error(e)});
    prod.title = updatedTitle;
    prod.image_url = updatedImage_url;
    prod.description = updatedDescription;
    prod.price = updatedPrice;
    return prod.save();
  })
  .then(result => {
    console.log('UPDATED PRODUCT!');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  // updatedProduct.save();
}

exports.getProducts = async (req, res, next) => {
  // Product.findAll({raw: true})
  req.user.getProducts({order: [['title', 'ASC'], ['createdAt', 'DESC']], raw: true})
  .then(products => {
    res.render('admin/products', {
      products: products,
      pageTitle: 'Product Panel',
      path: '/admin/products'
    });
  })
  .catch(err => { console.log(err); });
};

exports.postDeleteProduct = async (req, res, next) => {
  const productId = req.body.productId;
  req.user.getProducts({where: {userId: req.user.id, id: productId}})
  .then(prod => {
    prod = prod[0];
    console.log(JSON.stringify(prod));
    prod.destroy();
    res.redirect('/admin/products');
  })
  .catch(err => { console.log(err); res.redirect('/admin/products'); });
}

exports.deleteByTitle = async (req, res, next) => {
  Product.deleteByTitle(req.params.title);
  res.status(204).end();
}
