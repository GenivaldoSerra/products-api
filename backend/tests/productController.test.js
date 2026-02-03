const { describe, test, expect, beforeEach } = require('@jest/globals');
const ProductController = require('../src/controllers/productController');
const ProductService = require('../src/models/productModel');

// Mock do ProductService
jest.mock('../src/models/productModel');
jest.mock('../src/config/logger', () => ({
  info: jest.fn(),
  error: jest.fn()
}));

describe('ProductController', () => {
  let req, res, next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  const mockProduct = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    nome: 'Produto Teste',
    valor: 99.99
  };

  describe('getAllProducts', () => {
    test('should return all products', async () => {
      ProductService.getAllProducts.mockResolvedValue([mockProduct]);

      await ProductController.getAllProducts(req, res, next);

      expect(ProductService.getAllProducts).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([mockProduct]);
    });

    test('should handle errors', async () => {
      const error = new Error('Database error');
      ProductService.getAllProducts.mockRejectedValue(error);

      await ProductController.getAllProducts(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe('getProductById', () => {
    test('should return product by id', async () => {
      req.params.id = mockProduct.id;
      ProductService.getProductById.mockResolvedValue(mockProduct);

      await ProductController.getProductById(req, res, next);

      expect(ProductService.getProductById).toHaveBeenCalledWith(mockProduct.id);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    test('should return 404 for non-existent product', async () => {
      req.params.id = 'invalid-id';
      ProductService.getProductById.mockResolvedValue(null);

      await ProductController.getProductById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Produto não encontrado' });
    });
  });

  describe('createProduct', () => {
    test('should create new product', async () => {
      req.body = { nome: 'Novo Produto', valor: 149.99 };
      ProductService.createProduct.mockResolvedValue(mockProduct);

      await ProductController.createProduct(req, res, next);

      expect(ProductService.createProduct).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('updateProduct', () => {
    test('should update existing product', async () => {
      req.params.id = mockProduct.id;
      req.body = { nome: 'Produto Atualizado' };
      ProductService.getProductById.mockResolvedValue(mockProduct);
      ProductService.updateProduct.mockResolvedValue({ ...mockProduct, ...req.body });

      await ProductController.updateProduct(req, res, next);

      expect(ProductService.updateProduct).toHaveBeenCalledWith(mockProduct.id, req.body);
      expect(res.json).toHaveBeenCalled();
    });

    test('should return 404 for non-existent product', async () => {
      req.params.id = 'invalid-id';
      ProductService.getProductById.mockResolvedValue(null);

      await ProductController.updateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Produto não encontrado' });
    });
  });

  describe('deleteProduct', () => {
    test('should delete existing product', async () => {
      req.params.id = mockProduct.id;
      ProductService.getProductById.mockResolvedValue(mockProduct);
      ProductService.deleteProduct.mockResolvedValue(mockProduct);

      await ProductController.deleteProduct(req, res, next);

      expect(ProductService.deleteProduct).toHaveBeenCalledWith(mockProduct.id);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });

    test('should return 404 for non-existent product', async () => {
      req.params.id = 'invalid-id';
      ProductService.getProductById.mockResolvedValue(null);

      await ProductController.deleteProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Produto não encontrado' });
    });
  });
});
