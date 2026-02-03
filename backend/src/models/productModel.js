const prisma = require('../config/database');

class ProductService {
  async getAllProducts() {
    return await prisma.product.findMany({
      orderBy: { created_at: 'desc' }
    });
  }

  async getProductById(id) {
    return await prisma.product.findUnique({
      where: { id }
    });
  }

  async createProduct(data) {
    return await prisma.product.create({
      data: {
        nome: data.nome,
        valor: data.valor
      }
    });
  }

  async updateProduct(id, data) {
    return await prisma.product.update({
      where: { id },
      data
    });
  }

  async deleteProduct(id) {
    return await prisma.product.delete({
      where: { id }
    });
  }
}

module.exports = new ProductService();
