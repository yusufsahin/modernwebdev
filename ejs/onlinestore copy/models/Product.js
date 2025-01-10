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

        // Dönen verinin sayısal alanlarını dönüştür
        if (product.length > 0) {
            product[0].price = parseFloat(product[0].price); // Fiyatı sayıya dönüştür
            return product[0];
        }

        return null;
    }
}

module.exports=Product;