const db =  require("../config/db");

class Product{

    static async getByCategory(categoryId){
        const [products] =await db.query('SELECT * FROM products WHERE category_id = ?',[categoryId]);
        return products;
    }

    static async getFeatured(limit =6 ){
        const [products] =await db.query('SELECT * FROM products LIMIT ?',[limit]);
        return products;
    }

    static async getById(productId) {
        const [product] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
        return product[0];
      }
}

module.exports=Product;