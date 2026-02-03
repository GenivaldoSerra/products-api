const { z } = require('zod');

const createProductSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo'),
  valor: z.number().positive('Valor deve ser positivo')
});

const updateProductSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório').max(255, 'Nome muito longo').optional(),
  valor: z.number().positive('Valor deve ser positivo').optional()
});

const validateCreateProduct = (req, res, next) => {
  try {
    createProductSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Dados inválidos',
      details: error.errors
    });
  }
};

const validateUpdateProduct = (req, res, next) => {
  try {
    updateProductSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Dados inválidos',
      details: error.errors
    });
  }
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct
};
