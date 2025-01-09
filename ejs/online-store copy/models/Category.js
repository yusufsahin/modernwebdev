const db = require('../config/db');

class Category {
  static async getAll() {
    const [categories] = await db.query('SELECT * FROM categories');
    return categories;
  }
}

module.exports = Category;