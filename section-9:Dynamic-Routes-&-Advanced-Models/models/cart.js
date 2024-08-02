const fs = require('fs');
const path = require('path');

const projectPath = require('../util/path');

cart_path = path.join(
  projectPath.data_dir_path,
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(cart_path, (err, fileContent) => {
      let cart = {products:[], totalPrice: 0};
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProduct = cart.products.find(product => product.id === id);
      let updatedProduct = {id: id, qty: 1};
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += parseInt(price);
      fs.writeFile(cart_path, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    })
  }
}