const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const categoryController = require('../controllers/categoryController');

router.get('/initialize', productController.initializeData);
router.get('/products/:id', productController.getProductDetails);
router.get('/products', productController.getProductsByCategory);
router.post('/cart/add', cartController.addToCart);
router.post('/cart/remove', cartController.removeFromCart);
router.get('/categories', categoryController.getCategories);
router.post('/api/cart/update', cartController.updateQuantity);
router.post('/api/cart/remove', cartController.removeFromCart);
router.post('/api/cart/add', cartController.addToCart);

module.exports = router;
