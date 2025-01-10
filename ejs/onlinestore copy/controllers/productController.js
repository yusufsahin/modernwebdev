const Category = require('../models/Category');
const Product = require('../models/Product');


exports.initializeData = async (req, res) => {
  try {
    const categories = await Category.getAll();
    const products = await Product.getFeatured();
    res.json({ categories, products });
  } catch (error) {
    console.error('Error initializing data:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getFilteredHome = async (req, res) => {
  try {
    const categories = await Category.getAll();
    const products = await Product.getFeatured();
    res.render('pages/index', { categories, products });
  } catch (error) {
    console.error('Error fetching home page:', error);
    res.status(500).send('Server error');
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.getById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ product });
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.query.category;
    const products = await Product.getByCategory(categoryId);
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.viewProductDetails = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.getById(productId);
        const categories = await Category.getAll();

        if (!product) {
            return res.status(404).send('Product not found');
        }

        res.render('pages/product', { product, categories });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Server error');
    }
};

