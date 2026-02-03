const ProductService = require('../models/productModel');
const logger = require('../config/logger');

class ProductController {
  async getAllProducts(req, res, next) {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await ProductService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const product = await ProductService.createProduct(req.body);
      logger.info(`Produto criado: ${product.id}`);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      
      const existingProduct = await ProductService.getProductById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      const product = await ProductService.updateProduct(id, req.body);
      logger.info(`Produto atualizado: ${product.id}`);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      
      const existingProduct = await ProductService.getProductById(id);
      if (!existingProduct) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }

      await ProductService.deleteProduct(id);
      logger.info(`Produto deletado: ${id}`);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();
