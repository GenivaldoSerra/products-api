# Products API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue.svg)](https://postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![AWS Ready](https://img.shields.io/badge/AWS-Ready-orange.svg)](https://aws.amazon.com/)

Sistema de cadastro e gerenciamento de produtos com arquitetura preparada para deploy na AWS.

## 📋 Índice

- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Banco de Dados](#-banco-de-dados)
- [Deploy AWS](#-deploy-aws)
- [Contribuição](#-contribuição)

## 🏗️ Arquitetura

```
┌─────────────┐    HTTP/REST    ┌─────────────┐    SQL    ┌─────────────┐
│   Frontend  │ ──────────────► │   Backend   │ ────────► │ PostgreSQL  │
│   (React)   │                 │  (Node.js)  │           │             │
└─────────────┘                 └─────────────┘           └─────────────┘
```

### Componentes

- **Frontend**: Interface React para gerenciamento de produtos
- **Backend**: API REST em Node.js com validação e regras de negócio
- **Database**: PostgreSQL para persistência de dados

### Benefícios da Arquitetura

- ✅ Deploy independente dos componentes
- ✅ Escalabilidade horizontal
- ✅ Preparado para containers (Docker)
- ✅ Compatível com serviços AWS (ECS, EKS, RDS)

## 🛠️ Tecnologias

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL 14+
- **ORM**: Prisma
- **Validação**: Zod
- **Logs**: Winston

### Frontend
- **Framework**: React 18+
- **Build**: Vite
- **HTTP Client**: Axios

## 📋 Pré-requisitos

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone <repository-url>
cd products-api
```

### 2. Instale as dependências
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure o banco de dados
```bash
# Crie o banco PostgreSQL
createdb products_db

# Execute as migrations
cd backend
npm run migrate
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório `backend/`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/products_db"

# Server
PORT=3000
NODE_ENV=development

# Logs
LOG_LEVEL=info
```

## 🎯 Uso

### Desenvolvimento

```bash
# Backend (porta 3000)
cd backend
npm run dev

# Frontend (porta 5173)
cd frontend
npm run dev
```

### Produção

```bash
# Build
npm run build

# Start
npm start
```

## 📡 API Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Health check da API |
| GET | `/products` | Lista todos os produtos |
| GET | `/products/:id` | Busca produto por ID |
| POST | `/products` | Cria novo produto |
| PUT | `/products/:id` | Atualiza produto |
| DELETE | `/products/:id` | Remove produto |

### Exemplo de Payload

```json
{
  "nome": "Teclado Mecânico",
  "valor": 299.90
}
```

### Resposta de Sucesso

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Teclado Mecânico",
  "valor": 299.90,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

## 🗄️ Banco de Dados

### Modelo de Dados

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(255) NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Migrations

```bash
# Criar nova migration
npm run migrate:create <nome>

# Executar migrations
npm run migrate

# Rollback
npm run migrate:rollback
```

## ☁️ Deploy AWS

### Roadmap de Migração

#### Fase 1: Containerização
- [ ] Dockerfile para backend
- [ ] Dockerfile para frontend
- [ ] Docker Compose para desenvolvimento

#### Fase 2: AWS Infrastructure
- [ ] RDS PostgreSQL
- [ ] ECS/Fargate para containers
- [ ] Application Load Balancer
- [ ] CloudWatch para logs

#### Fase 3: CI/CD
- [ ] GitHub Actions
- [ ] ECR para imagens Docker
- [ ] Terraform para IaC

### Estrutura AWS Planejada

```
Internet Gateway
       │
   ┌───▼───┐
   │  ALB  │
   └───┬───┘
       │
   ┌───▼───┐    ┌─────────┐
   │  ECS  │────│   RDS   │
   │ Tasks │    │PostgreSQL│
   └───────┘    └─────────┘
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido para aprendizado de DevOps e AWS**