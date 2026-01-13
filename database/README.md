# 🗄️ Scripts SQL - Automotors Garagem

## 📋 Visão Geral

Esta pasta contém todos os scripts SQL necessários para criar e popular o banco de dados PostgreSQL do projeto **Automotors Garagem**.

---

## 📁 Arquivos Disponíveis

| Arquivo | Descrição | Ordem |
|---------|-----------|-------|
| `00_executar_todos.sql` | **Script principal** - Executa todos os outros scripts | 1º |
| `01_create_tables.sql` | Cria todas as tabelas, índices, triggers e ENUMs | 2º |
| `02_seed_data.sql` | Insere dados de exemplo (seed) | 3º |
| `03_queries_uteis.sql` | Consultas úteis e views | 4º |

---

## 🚀 Como Executar

### Opção 1: Executar Tudo de Uma Vez (Recomendado)

```bash
# No terminal, navegue até a pasta database:
cd database

# Execute o script principal:
psql -U postgres -d lf_services -f 00_executar_todos.sql
```

**Isso vai:**
1. ✅ Criar todas as 13 tabelas
2. ✅ Criar 35+ índices
3. ✅ Criar 3 ENUMs
4. ✅ Criar 9 triggers
5. ✅ Inserir dados de exemplo
6. ✅ Criar 2 views úteis

---

### Opção 2: Executar Scripts Individualmente

```bash
# 1. Criar tabelas
psql -U postgres -d lf_services -f 01_create_tables.sql

# 2. Inserir dados
psql -U postgres -d lf_services -f 02_seed_data.sql

# 3. Carregar consultas úteis
psql -U postgres -d lf_services -f 03_queries_uteis.sql
```

---

### Opção 3: Dentro do psql

```sql
-- Conecte ao banco:
psql -U postgres -d lf_services

-- Execute os scripts:
\i database/00_executar_todos.sql
```

---

## 🗂️ Estrutura do Banco de Dados

### Tabelas Criadas (13)

1. **users** - Usuários do sistema
2. **addresses** - Endereços dos usuários
3. **manufacturers** - Montadoras de veículos
4. **vehicles** - Modelos de veículos
5. **vehicle_variants** - Variantes (Ano + Modelo)
6. **categories** - Categorias de produtos
7. **products** - Produtos/Peças
8. **product_images** - Imagens dos produtos
9. **vehicle_compatibilities** - Compatibilidade Produto ↔ Veículo
10. **cart_items** - Itens do carrinho
11. **orders** - Pedidos
12. **order_items** - Itens dos pedidos

### ENUMs Criados (3)

- `vehicle_type` - CAR, MOTORCYCLE, TRUCK
- `user_role` - CUSTOMER, ADMIN, MANAGER
- `order_status` - PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED

### Índices (35+)

Índices otimizados para:
- Buscas por email, CPF, SKU
- Filtros por categoria, montadora, tipo
- Busca full-text em nome e descrição
- Performance em joins

### Triggers (9)

Atualização automática de `updated_at` em todas as tabelas relevantes.

---

## 📊 Dados de Exemplo (Seed)

Após executar o seed, você terá:

- ✅ **8 Montadoras** (Volkswagen, Chevrolet, Fiat, Ford, Honda, Toyota, Hyundai, Nissan)
- ✅ **13 Veículos** (Gol, Fusca, Civic, Corolla, etc.)
- ✅ **9 Variantes** (Anos e modelos específicos)
- ✅ **7 Categorias** (Motor, Freios, Suspensão, etc.)
- ✅ **8 Produtos** (Pastilha, Filtro, Amortecedor, Bateria, etc.)
- ✅ **8 Imagens** (Uma para cada produto)
- ✅ **23 Compatibilidades** (Produtos vinculados a veículos)
- ✅ **2 Usuários de teste** (Admin e Cliente)
- ✅ **1 Endereço**

---

## 🔍 Consultas Úteis

O arquivo `03_queries_uteis.sql` contém **25+ consultas** prontas para usar:

### Exemplos:

**1. Listar produtos em destaque:**
```sql
SELECT * FROM products WHERE is_featured = TRUE AND is_active = TRUE;
```

**2. Buscar produtos compatíveis com um veículo:**
```sql
-- Veja no arquivo 03_queries_uteis.sql (seção 2.3)
```

**3. Produtos mais vendidos:**
```sql
-- Veja no arquivo 03_queries_uteis.sql (seção 3.4)
```

**4. Resumo geral do sistema:**
```sql
-- Veja no arquivo 03_queries_uteis.sql (seção 5.1)
```

---

## ⚙️ Configuração do Projeto

Após executar os scripts SQL, configure o projeto Node.js:

### 1. Configure o `.env`

```env
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/lf_services?schema=public"
```

### 2. **IMPORTANTE:** Atualize o Prisma Schema

Edite o arquivo `prisma/schema.prisma` e altere o nome do banco:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Não precisa especificar o nome do banco aqui
  // Ele vem da DATABASE_URL
}
```

### 3. Gere o Prisma Client

```bash
npm run prisma:generate
```

### 4. **NÃO execute migrations!**

Como você já criou as tabelas manualmente, **NÃO execute** `npm run prisma:migrate`.

Se o Prisma reclamar, você pode:

```bash
# Marcar as migrations como aplicadas (sem executar)
npx prisma migrate resolve --applied "init"
```

---

## 🔄 Resetar o Banco (Cuidado!)

Se precisar recomeçar do zero:

```sql
-- Conecte ao banco:
psql -U postgres -d lf_services

-- Apague tudo:
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Execute novamente:
\i database/00_executar_todos.sql
```

---

## 🧪 Testar a Instalação

### 1. Verificar tabelas criadas:

```sql
\c lf_services
\dt
```

Você deve ver 13 tabelas.

### 2. Contar registros:

```sql
SELECT 
    (SELECT COUNT(*) FROM manufacturers) AS manufacturers,
    (SELECT COUNT(*) FROM vehicles) AS vehicles,
    (SELECT COUNT(*) FROM products) AS products,
    (SELECT COUNT(*) FROM users) AS users;
```

Resultado esperado:
```
 manufacturers | vehicles | products | users 
---------------+----------+----------+-------
             8 |       13 |        8 |     2
```

### 3. Testar busca de produtos:

```sql
SELECT id, name, price, stock 
FROM products 
WHERE is_active = TRUE 
LIMIT 5;
```

---

## 📝 Notas Importantes

### ⚠️ Senhas dos Usuários de Teste

Os usuários criados no seed têm senhas **mockadas**:

```
Email: admin@automotors.com
Senha: 123456 (hash mockado)

Email: cliente@email.com
Senha: 123456 (hash mockado)
```

**Em produção, use bcrypt para hash real!**

### 🔒 Segurança

- Todos os scripts usam **prepared statements** via Prisma
- Relacionamentos com **CASCADE** e **RESTRICT** apropriados
- Constraints de **CHECK** para validar dados
- Índices para **prevenir duplicatas**

### 🚀 Performance

- **Índices** em todas as foreign keys
- **Full-text search** em produtos (português)
- **Triggers** para atualização automática
- **Views** para consultas complexas

---

## 🐛 Problemas Comuns

### Erro: "database lf_services does not exist"

**Solução:**
```sql
-- Crie o banco primeiro:
psql -U postgres
CREATE DATABASE lf_services;
\q

-- Depois execute os scripts:
psql -U postgres -d lf_services -f 00_executar_todos.sql
```

### Erro: "permission denied"

**Solução:**
```bash
# Use o usuário postgres:
psql -U postgres -d lf_services -f 00_executar_todos.sql

# Ou crie um superuser:
CREATE USER seu_usuario WITH SUPERUSER PASSWORD 'sua_senha';
```

### Erro: "relation already exists"

**Solução:**
```sql
-- As tabelas já existem. Para recriar:
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Execute novamente:
\i database/00_executar_todos.sql
```

---

## 📚 Recursos Adicionais

### Documentação PostgreSQL
- [CREATE TABLE](https://www.postgresql.org/docs/current/sql-createtable.html)
- [CREATE INDEX](https://www.postgresql.org/docs/current/sql-createindex.html)
- [Full-Text Search](https://www.postgresql.org/docs/current/textsearch.html)

### Documentação Prisma
- [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)
- [Migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate)

---

## ✅ Checklist de Instalação

- [ ] Banco `lf_services` criado
- [ ] Scripts SQL executados
- [ ] 13 tabelas criadas
- [ ] Dados de exemplo inseridos
- [ ] `.env` configurado no projeto
- [ ] `npm install` executado
- [ ] `npm run prisma:generate` executado
- [ ] Aplicação rodando (`npm run dev`)

---

## 🎉 Pronto!

Seu banco de dados está configurado e pronto para uso!

**Próximo passo:** Execute `npm run dev` e acesse http://localhost:3000

---

**Dúvidas?** Consulte a documentação principal no arquivo `README.md` na raiz do projeto.
