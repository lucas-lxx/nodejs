const crypto = require('crypto');

const db = require('../util/database');

module.exports = class Product{
  constructor(title, image_url, description, price) {
    this.title = title;
    this.image_url = image_url;
    if (!image_url) this.image_url = 'https://preview.redd.it/toea7o9mmk481.jpg?width=1080&crop=smart&auto=webp&s=ff47ea91395dacbc8eb8a214a63d7f1d3e1b307a';
    this.description = description;
    this.price = price;
  }

  save() {
  };

  static deleteById(id) {
  };

  static deleteByTitle(title) {
  };

  static fetchAll() {
    return db.execute(`
      SELECT *
      FROM products;
    `);
  }
  
  static findById(id) {
  }
};