const { describe, test, expect, beforeEach } = require('@jest/globals');
const ProductService = require('../src/models/productModel');

// Mock do Prisma
const mockPrisma = {
  product: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
};

jest.mock('../src/config/database', () => mockPrisma);

describe('ProductService', () => {
  const mockProduct = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    nome: 'Produto Teste',
    valor: 99.99,
    created_at: new Date(),
    updated_at: new Date()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllProducts', () => {
    test('should return all products', async () => {
      mockPrisma.product.findMany.mockResolvedValue([mockProduct]);

      const result = await ProductService.getAllProducts();

      expect(mockPrisma.product.findMany).toHaveBeenCalledWith({
        orderBy: { created_at: 'desc' }
      });
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('getProductById', () => {
    test('should return product by id', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(mockProduct);

      const result = await ProductService.getProductById(mockProduct.id);

      expect(mockPrisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: mockProduct.id }
      });
      expect(result).toEqual(mockProduct);
    });

    test('should return null for non-existent product', async () => {
      mockPrisma.product.findUnique.mockResolvedValue(null);

      const result = await ProductService.getProductById('invalid-id');

      expect(result).toBeNull();
    });
  });

  describe('createProduct', () => {
    test('should create new product', async () => {
      const productData = { nome: 'Novo Produto', valor: 149.99 };
      mockPrisma.product.create.mockResolvedValue({ ...mockProduct, ...productData });

      const result = await ProductService.createProduct(productData);

      expect(mockPrisma.product.create).toHaveBeenCalledWith({
        data: productData
      });
      expect(result.nome).toBe(productData.nome);
      expect(result.valor).toBe(productData.valor);
    });
  });

  describe('updateProduct', () => {
    test('should update existing product', async () => {
      const updateData = { nome: 'Produto Atualizado' };
      const updatedProduct = { ...mockProduct, ...updateData };
      mockPrisma.product.update.mockResolvedValue(updatedProduct);

      const result = await ProductService.updateProduct(mockProduct.id, updateData);

      expect(mockPrisma.product.update).toHaveBeenCalledWith({
        where: { id: mockProduct.id },
        data: updateData
      });
      expect(result.nome).toBe(updateData.nome);
    });
  });

  describe('deleteProduct', () => {
    test('should delete product', async () => {
      mockPrisma.product.delete.mockResolvedValue(mockProduct);

      const result = await ProductService.deleteProduct(mockProduct.id);

      expect(mockPrisma.product.delete).toHaveBeenCalledWith({
        where: { id: mockProduct.id }
      });
      expect(result).toEqual(mockProduct);
    });
  });
});
