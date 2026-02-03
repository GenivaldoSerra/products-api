## 1. Arquitetura da Aplicação

A arquitetura do projeto segue um fluxo clássico, simples e bem definido, com separação clara de responsabilidades entre os componentes.

### Front End
- **Tecnologia:** React
- **Responsabilidade:**
  - Interface do usuário
  - Consumo da API via HTTP

### Back End
- **Tecnologia:** Node.js
- **Responsabilidade:**
  - Exposição de uma API REST
  - Regras de negócio
  - Comunicação com o banco de dados

### Banco de Dados
- **Tecnologia:** PostgreSQL
- **Observação:** Inicialmente local ou via Docker, com migração futura para **AWS RDS PostgreSQL**

### Separação de responsabilidades
O Front End e o Back End são totalmente desacoplados, o que permite:
- Deploy independente
- Escalabilidade separada
- Criação de labs futuros na AWS utilizando:
  - ECS
  - EKS
  - EC2
  - Application Load Balancer (ALB)

Essa abordagem está alinhada com boas práticas de **DevOps e Cloud Computing**.

---

## 2. Escopo da Aplicação

A aplicação tem como objetivo o **cadastro e gerenciamento de produtos**, mantendo o escopo simples, porém profissional.

### Entidade: Produto

#### Campos mínimos
- `id`
- `nome`
- `valor`

#### Campos adicionais recomendados
Mesmo em uma aplicação simples, é importante incluir campos de auditoria:
- `created_at`
- `updated_at`

#### Estrutura final da entidade

```text
Produto
- id (UUID ou SERIAL)
- nome (string, obrigatório)
- valor (decimal, obrigatório)
- created_at (timestamp)
- updated_at (timestamp)
```

Essa modelagem prepara a aplicação para:

Auditoria

Observabilidade

Boas práticas de banco de dados

## 3. Roteiro de Desenvolvimento

### Fase 1 – Planejamento do Repositório
Sugestão de estrutura inicial do projeto:

```
produto-app/
├── backend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile (futuro)
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile (futuro)
└── docker-compose.yml (opcional no início)
```
Mesmo que o Docker não seja utilizado inicialmente, pensar nessa estrutura desde o início facilita a evolução do projeto e os futuros labs.
---

### Fase 2 – Back End (Node.js + API REST)

### 2.1 Stack Sugerida
* Node.js

* Express

* PostgreSQL

* ORM:

  * Prisma ou

  * Sequelize

* Validação:

  * Zod ou

  * Joi

* Logs:

  * winston ou

  * pino

## 2.2 Endpoints da API
```text
GET    /health
GET    /products
GET    /products/:id
POST   /products
PUT    /products/:id
DELETE /products/:id
```
Exemplo de payload para criação de produto

```text
{
  "nome": "Teclado Mecânico",
  "valor": 299.90
}
```

Boas práticas desde o início
* Retornar status HTTP corretos

* Validar todas as entradas

* Nunca confiar nos dados vindos do Front End

## Fase 3 – Banco de Dados (Postgres local → RDS)

## 3.1 Exemplo de tabela SQL
```text
CREATE TABLE products (
  id UUID PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  valor NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

Estratégia de evolução
* Inicialmente: PostgreSQL local ou via Docker

* Futuro: Migração para AWS RDS PostgreSQL sem necessidade de alterar o código da aplicação


Se quiser, no próximo passo posso:
- Ajustar o texto para um tom mais **corporativo**
- Criar um **README completo** (com badges, setup local e roadmap)
- Ou já incluir uma seção de **arquitetura AWS futura** 🌩️