const fs = require('fs');
const path = require('path');

const projectPath = require('../util/path');

const p = path.join(
  projectPath.root_dir_path, 
  'data', 
  'products.json'
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    return cb(JSON.parse(fileContent));
  });
};

module.exports = class Product{
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      })
    });
  };

  static fetchAll(cb) {
    getProductFromFile(cb);
  };
};