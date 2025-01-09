const Category = require('../models/Category');
const Product = require('../models/Product');

exports.getFilteredHome = async (req, res) => {
  try {
    const categoryId = req.query.category;
    const categories = await Category.getAll();

    const products = categoryId
      ? await Product.getByCategory(categoryId)
      : await Product.getFeatured();

    res.render('index', { categories, products, selectedCategory: categoryId, product: null });
  } catch (error) {
    console.error('Error in getFilteredHome:', error);
    res.status(500).send('Server Error');
  }
};


exports.getProductDetails = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.getById(productId); // Veri tabanından ürünü getir

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ product }); // Ürün detaylarını JSON olarak döndür
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.query.category;
    const products = categoryId
      ? await Product.getByCategory(categoryId)
      : await Product.getFeatured();
    
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
