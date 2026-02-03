const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: err.message
    });
  }

  if (err.code === 'P2002') {
    return res.status(409).json({
      error: 'Conflito de dados',
      details: 'Registro já existe'
    });
  }

  res.status(500).json({
    error: 'Erro interno do servidor'
  });
};

module.exports = { errorHandler };
