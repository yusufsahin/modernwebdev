const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getFilteredHome);
router.get('/products/:id', productController.viewProductDetails);

module.exports = router;
