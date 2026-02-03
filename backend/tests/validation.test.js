const { describe, test, expect } = require('@jest/globals');
const { validateCreateProduct, validateUpdateProduct } = require('../src/middleware/validation');

describe('Validation Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('validateCreateProduct', () => {
    test('should pass validation with valid data', () => {
      req.body = { nome: 'Produto Válido', valor: 99.99 };

      validateCreateProduct(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should fail validation with missing nome', () => {
      req.body = { valor: 99.99 };

      validateCreateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Dados inválidos',
        details: expect.any(Array)
      });
      expect(next).not.toHaveBeenCalled();
    });

    test('should fail validation with negative valor', () => {
      req.body = { nome: 'Produto', valor: -10 };

      validateCreateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });

    test('should fail validation with empty nome', () => {
      req.body = { nome: '', valor: 99.99 };

      validateCreateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('validateUpdateProduct', () => {
    test('should pass validation with valid partial data', () => {
      req.body = { nome: 'Produto Atualizado' };

      validateUpdateProduct(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should pass validation with empty body', () => {
      req.body = {};

      validateUpdateProduct(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should fail validation with invalid valor', () => {
      req.body = { valor: -50 };

      validateUpdateProduct(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
