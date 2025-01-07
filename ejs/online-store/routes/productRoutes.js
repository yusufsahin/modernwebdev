const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:id', productController.getProductDetails);

module.exports = router;