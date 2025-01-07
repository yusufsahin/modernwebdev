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
    const categories = await Category.getAll();
    const product = await Product.getById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render('index', { categories, products: [], selectedCategory: null, product });
  } catch (error) {
    console.error('Error in getProductDetails:', error);
    res.status(500).send('Server Error');
  }
};