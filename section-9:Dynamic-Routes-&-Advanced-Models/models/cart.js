const fs = require('fs');
const path = require('path');

const projectPath = require('../util/path');

cart_path = path.join(
  projectPath.data_dir_path,
  'cart.json'
);

const getCart = (cb) => {
  fs.readFile(cart_path, (err, cart) => {
    if (err) {
      return cb({products: [], totalPrice: 0});
    }
    return cb(JSON.parse(cart));
  });
};

module.exports = class Cart {
  static addProduct(id, price) {
    getCart(cart => {
      const existingProduct = cart.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.qty += 1;
      } 
      const productAdded = {id: id, qty: 1};
      cart.products.push(productAdded);
      cart.totalPrice += price;
      return JSON.stringify(cart, null, "\t");
    });
  };

  static fetchAll(cb) {
    getCart(cb);
  }
}