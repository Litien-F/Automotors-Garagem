# ⚡ COMANDOS RÁPIDOS - Automotors Garagem

## 🚀 Iniciar o Projeto

```powershell
# 1. Navegue até o projeto
cd "c:\Users\Litien\source\repos\Automotors Garagem"

# 2. Rode o servidor
npm run dev
```

**Acesse:** http://localhost:3000

---

## 🔧 Comandos Úteis

### Desenvolvimento

```powershell
# Rodar em modo desenvolvimento
npm run dev

# Rodar em modo produção
npm run build
npm start

# Gerar Prisma Client
npm run prisma:generate

# Abrir Prisma Studio (visualizar banco)
npx prisma studio
```

### Banco de Dados

```powershell
# Conectar ao banco via psql
psql -U postgres -d lf_services

# Executar script SQL
psql -U postgres -d lf_services -f database/01_create_tables_autoincrement.sql

# Ver tabelas
psql -U postgres -d lf_services -c "\dt"

# Ver dados de uma tabela
psql -U postgres -d lf_services -c "SELECT * FROM products LIMIT 5;"
```

### Linting e Formatação

```powershell
# Verificar erros de lint
npm run lint

# Formatar código (se configurado)
npm run format
```

---

## 🧪 Testar APIs

### Via Navegador

```
http://localhost:3000/api/products/featured
http://localhost:3000/api/vehicles/manufacturers
```

### Via PowerShell (curl)

```powershell
# Produtos em destaque
curl http://localhost:3000/api/products/featured

# Montadoras
curl http://localhost:3000/api/vehicles/manufacturers

# Buscar produtos
curl -X POST http://localhost:3000/api/products/search -H "Content-Type: application/json" -d '{\"query\":\"freio\"}'
```

---

## 📱 Testar Responsividade

### No Navegador

1. Abra http://localhost:3000
2. Pressione `F12` (DevTools)
3. Clique no ícone de dispositivo móvel
4. Teste diferentes tamanhos:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1280px)

---

## 🐛 Resolver Problemas Comuns

### Erro: "Port 3000 already in use"

```powershell
# Encontrar processo na porta 3000
netstat -ano | findstr :3000

# Matar processo (substitua <PID>)
taskkill /PID <PID> /F
```

### Erro: "Cannot find module"

```powershell
# Reinstalar dependências
rm -r node_modules
rm package-lock.json
npm install
```

### Erro: "Prisma Client not generated"

```powershell
npm run prisma:generate
```

### Erro de conexão com banco

```powershell
# Verificar se PostgreSQL está rodando
Get-Service -Name postgresql*

# Iniciar PostgreSQL (se parado)
Start-Service postgresql-x64-14
```

---

## 📊 Verificar Status

### Verificar se tudo está funcionando

```powershell
# 1. Banco de dados
psql -U postgres -d lf_services -c "SELECT COUNT(*) FROM products;"

# 2. Prisma Client
npx prisma studio

# 3. Servidor Next.js
npm run dev

# 4. API
curl http://localhost:3000/api/products/featured
```

---

## 🔄 Reiniciar do Zero

```powershell
# 1. Parar servidor (Ctrl+C)

# 2. Limpar cache
rm -r .next
rm -r node_modules

# 3. Reinstalar
npm install

# 4. Gerar Prisma
npm run prisma:generate

# 5. Rodar
npm run dev
```

---

## 📝 Variáveis de Ambiente

### Arquivo `.env`

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/lf_services?schema=public"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Verificar se está correto

```powershell
# Ver conteúdo do .env
Get-Content .env

# Testar conexão
npx prisma studio
```

---

## 🎯 Atalhos do Navegador

| Atalho | Ação |
|--------|------|
| `F12` | Abrir DevTools |
| `Ctrl + Shift + M` | Toggle device toolbar |
| `Ctrl + Shift + R` | Hard reload |
| `Ctrl + Shift + I` | Inspecionar elemento |

---

## 📚 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `GUIA_EXECUCAO_REFATORADO.md` | Guia completo de execução |
| `ANALISE_REFATORACAO.md` | Análise técnica da refatoração |
| `NOVA_ESTRUTURA.md` | Estrutura de pastas |
| `PASSO_A_PASSO_COMPLETO.md` | Passo a passo detalhado |

---

## 🆘 Precisa de Ajuda?

**Contato:**
- 📞 (85) 98791-9027
- 📧 litien.dev@hotmail.com.br

---

## ✅ Checklist Rápido

Antes de começar a desenvolver:

- [ ] PostgreSQL rodando
- [ ] Arquivo `.env` configurado
- [ ] `npm install` executado
- [ ] `npm run prisma:generate` executado
- [ ] `npm run dev` rodando
- [ ] http://localhost:3000 abrindo
- [ ] Produtos aparecendo na página

**Tudo OK?** Você está pronto para desenvolver! 🚀
