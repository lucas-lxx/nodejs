const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectPath = require('../util/path');

const p = path.join(
  projectPath.root_dir_path, 
  'data', 
  'products.json'
);

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class Product{
  constructor(title, imageUrl, description, price, uuid=null) {
    this.uuid = uuid;
    this.title = title;
    this.imageUrl = imageUrl;
    if (!imageUrl) this.imageUrl = 'https://preview.redd.it/toea7o9mmk481.jpg?width=1080&crop=smart&auto=webp&s=ff47ea91395dacbc8eb8a214a63d7f1d3e1b307a';
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.uuid === null) {
        this.uuid = crypto.randomUUID();
        products.push(this);
        console.log('Create Product');
      } else {
        const productUpdateIndex = products.findIndex(product => product.uuid === this.uuid);
        products[productUpdateIndex] = this;
        console.log('Update Product');
      }
      fs.writeFile(p, JSON.stringify(products, null, "\t"), (err) => {
        console.log(err);
      });
    });
  };

  static deleteById(uuid) {
    getProductsFromFile((products) => {
      if (!products) {
        return console.log('No products FromFile!');
      }
      const filteredProducts = products.filter(product => product.uuid !== uuid);
      fs.writeFile(p, JSON.stringify(filteredProducts, null, "\t"), (err) => {
        if (!err) {

        } else {
          console.log(err);
        }
      });
    });
  };

  static deleteByTitle(title) {
    getProductsFromFile((products) => {
      const allProducts = products;
      const filteredProducts = allProducts.filter(product => product.title !== title);
      fs.writeFile(p, JSON.stringify(filteredProducts, null, "\t"), (err) => {
        console.log(err);
      });
    });
  };

  static fetchAll(cb) {
    getProductsFromFile(cb);
  };

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.uuid === id);
      cb(product);
    })
  }
};