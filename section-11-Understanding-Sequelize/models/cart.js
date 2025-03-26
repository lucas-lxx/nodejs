// const fs = require('fs');
// const path = require('path');

// const projectPath = require('../util/path');
// const Product = require('./product');

// cart_path = path.join(
//   projectPath.data_dir_path,
//   'cart.json'
// );

// const getCart = (cb) => {
//   fs.readFile(cart_path, (err, cart) => {
//     if (err) {
//       return cb({products: [], totalPrice: +0});
//     }
//     return cb(JSON.parse(cart));
//   });
// };

// module.exports = class Cart {
//   static addProduct(id, price) {
//     getCart(cart => {
//       const existingProduct = cart.products.find(product => product.id === id);
//       if (existingProduct) {
//         existingProduct.qty += 1;
//       } else {
//         const productAdded = {id: id, qty: 1};
//         cart.products.push(productAdded);
//       } 
//       cart.totalPrice = ((cart.totalPrice * 100) + (price * 100)) / 100;
//       fs.writeFile(cart_path, JSON.stringify(cart, null, "\t"), (err) => {
//         if (err) { console.log(err) }
//       });
//     });
//   };

//   static fetchAll(cb) {
//     getCart(cb);
//   }


//   static deleteById(id, cb) {
//     getCart(cart => {
//       const deletedProductIndex = cart.products.findIndex(product => product.id === id);
//       const deletedProductQty = cart.products[deletedProductIndex].qty;
//       Product.findById(id, product => {
//         const deletedProductPrice = product.price;
//         console.log(typeof(cart.totalPrice), typeof(+deletedProductPrice));
//         cart.totalPrice = ((cart.totalPrice * 100) - ((deletedProductQty * 100) * +deletedProductPrice)) / 100;
//         cart.products.splice(deletedProductIndex, 1);
//         fs.writeFile(cart_path, JSON.stringify(cart, null, "\t"), (err) => {
//           if (err) { console.log(err) }
//           cb();
//         });
//       })
//     });
//   }
// }

const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Product = require('../models/product');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.STRING,
    autoIncrement: true,
    unique: true,
    allowNull: false,
    primaryKey: true
  },
  product_id: {
    type: Sequelize.UUID,
    unique: false,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Cart;