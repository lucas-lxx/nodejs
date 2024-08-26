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
    this.id = crypto.randomUUID();
    return db.execute(`
      INSERT INTO products (id, title, price, description, image_url)
      VALUES (?, ?, ?, ?, ?);
    `,
    [this.id, this.title, this.price, this.description, this.image_url]);
  };

  static deleteById(id) {
    return db.execute(`
      DELETE FROM products
      WHERE id=?;
    `, [id]);
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
    return db.execute(`
      SELECT *
      FROM products
      WHERE id=?
    `,
    [id]);
  }
};