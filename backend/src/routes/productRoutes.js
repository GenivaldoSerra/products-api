const express = require('express');
const ProductController = require('../controllers/productController');
const { validateCreateProduct, validateUpdateProduct } = require('../middleware/validation');

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.post('/', validateCreateProduct, ProductController.createProduct);
router.put('/:id', validateUpdateProduct, ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
