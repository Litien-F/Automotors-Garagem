# 🚀 PASSO A PASSO COMPLETO - Rodar API + Frontend

## 📍 Diretório Inicial

Abra o PowerShell e navegue até a pasta do projeto:

```powershell
cd "c:\Users\Litien\source\repos\Automotors Garagem"
```

---

## ✅ PASSO 1: Criar o Arquivo `.env`

**No diretório:** `c:\Users\Litien\source\repos\Automotors Garagem`

### Opção A - Criar via PowerShell (Recomendado):

```powershell
# Copie e cole este comando completo:
@"
DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@localhost:5432/lf_services?schema=public"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
"@ | Out-File -FilePath .env -Encoding utf8
```

### Opção B - Criar Manualmente:

1. Crie um arquivo chamado `.env` na raiz do projeto
2. Cole este conteúdo:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@localhost:5432/lf_services?schema=public"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**⚠️ IMPORTANTE:** Substitua `SUA_SENHA_AQUI` pela senha real do seu PostgreSQL!

### Verificar se foi criado:

```powershell
Get-Content .env
```

---

## ✅ PASSO 2: Instalar Dependências

**No diretório:** `c:\Users\Litien\source\repos\Automotors Garagem`

```powershell
npm install
```

**Aguarde:** Isso vai instalar todas as dependências (Next.js, React, Prisma, etc.)

**Saída esperada:**
```
added 345 packages in 45s
```

---

## ✅ PASSO 3: Gerar o Prisma Client

**No diretório:** `c:\Users\Litien\source\repos\Automotors Garagem`

```powershell
npm run prisma:generate
```

**Saída esperada:**
```
✔ Generated Prisma Client (5.9.0) to ./node_modules/@prisma/client
```

**O que isso faz:** Gera o código TypeScript que permite o Next.js se conectar ao banco PostgreSQL.

---

## ✅ PASSO 4: Testar a Conexão com o Banco

**No diretório:** `c:\Users\Litien\source\repos\Automotors Garagem`

```powershell
npx prisma studio
```

**O que acontece:**
- Abre uma interface visual em: http://localhost:5555
- Você verá todas as tabelas e dados do banco

**Se abrir e mostrar os dados:** ✅ Conexão funcionando!

**Feche o Prisma Studio:** Pressione `Ctrl+C` no terminal

---

## ✅ PASSO 5: Rodar o Servidor (API + Frontend)

**No diretório:** `c:\Users\Litien\source\repos\Automotors Garagem`

```powershell
npm run dev
```

**Saída esperada:**
```
   ▲ Next.js 14.2.0
   - Local:        http://localhost:3000
   - Environments: .env

 ✓ Ready in 2.5s
```

**⚠️ NÃO FECHE ESTE TERMINAL!** O servidor precisa ficar rodando.

---

## ✅ PASSO 6: Testar a API

### Teste 1: API de Montadoras

**Abra o navegador em:**
```
http://localhost:3000/api/vehicles/manufacturers
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Volkswagen",
      "slug": "volkswagen",
      "logoUrl": null
    },
    {
      "id": 2,
      "name": "Chevrolet",
      "slug": "chevrolet",
      "logoUrl": null
    },
    ...
  ]
}
```

### Teste 2: API de Produtos em Destaque

**Abra o navegador em:**
```
http://localhost:3000/api/products/featured
```

**Resposta esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Pastilha de Freio Dianteira",
      "price": 89.90,
      "stock": 50,
      "isFeatured": true,
      ...
    }
  ]
}
```

### Teste 3: API de Busca de Produtos

**Abra o navegador em:**
```
http://localhost:3000/api/products/search?query=freio
```

---

## ✅ PASSO 7: Testar o Frontend

**Abra o navegador em:**
```
http://localhost:3000
```

**Você verá:**
- ✨ Página inicial com animações
- 🔍 Barra de busca (Montadora → Veículo → Ano)
- 📊 Estatísticas
- 🎨 Design metálico moderno

---

## 🔗 Como o Frontend se Conecta à API

### Exemplo: Buscar Montadoras

O componente `SearchBar` faz uma chamada à API:

```typescript
// Frontend (React)
fetch('/api/vehicles/manufacturers')
  .then(res => res.json())
  .then(data => {
    console.log(data.data) // Lista de montadoras
  })
```

### Exemplo: Buscar Produtos

```typescript
// Frontend (React)
fetch('/api/products/featured')
  .then(res => res.json())
  .then(data => {
    console.log(data.data) // Lista de produtos
  })
```

---

## 📂 Estrutura de Diretórios

```
c:\Users\Litien\source\repos\Automotors Garagem\
│
├── .env                          ← VOCÊ CRIOU AQUI (Passo 1)
├── package.json                  ← Dependências
├── prisma/
│   └── schema.prisma             ← Atualizado (BigInt)
│
├── src/
│   ├── app/
│   │   ├── api/                  ← APIs (Backend)
│   │   │   ├── products/
│   │   │   │   ├── search/
│   │   │   │   │   └── route.ts  ← GET/POST /api/products/search
│   │   │   │   ├── featured/
│   │   │   │   │   └── route.ts  ← GET /api/products/featured
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts  ← GET /api/products/[id]
│   │   │   └── vehicles/
│   │   │       ├── manufacturers/
│   │   │       │   └── route.ts  ← GET /api/vehicles/manufacturers
│   │   │       └── [manufacturerId]/
│   │   │           └── route.ts  ← GET /api/vehicles/[id]
│   │   │
│   │   ├── layout.tsx            ← Layout global
│   │   └── page.tsx              ← Página inicial (Frontend)
│   │
│   ├── components/               ← Componentes React (Frontend)
│   │   ├── atoms/
│   │   │   ├── FluidButton.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Select.tsx
│   │   ├── molecules/
│   │   │   ├── SearchBar.tsx     ← Usa a API
│   │   │   └── ProductCard.tsx
│   │   └── organisms/
│   │       └── HeroSection.tsx   ← Usa SearchBar
│   │
│   └── lib/
│       ├── prisma.ts             ← Conexão com banco
│       └── repositories/         ← Lógica de negócio
│           ├── ProductRepository.ts
│           └── VehicleRepository.ts
│
└── database/                     ← Scripts SQL (já executados)
```

---

## 🔄 Fluxo Completo: Frontend → API → Banco

### Exemplo: Buscar Produtos

```
1. Usuário acessa: http://localhost:3000
   ↓
2. Frontend (page.tsx) renderiza HeroSection
   ↓
3. HeroSection renderiza SearchBar
   ↓
4. Usuário clica em "Buscar Peças"
   ↓
5. SearchBar faz: fetch('/api/products/search')
   ↓
6. Next.js roteia para: src/app/api/products/search/route.ts
   ↓
7. route.ts chama: ProductRepository.searchProducts()
   ↓
8. ProductRepository usa: Prisma Client
   ↓
9. Prisma Client consulta: PostgreSQL (lf_services)
   ↓
10. Banco retorna: Lista de produtos
   ↓
11. API retorna: JSON para o frontend
   ↓
12. Frontend renderiza: ProductCard com os dados
```

---

## 🐛 Problemas Comuns e Soluções

### ❌ Erro: "Environment variable not found: DATABASE_URL"

**Causa:** Arquivo `.env` não existe ou está no lugar errado.

**Solução:**
```powershell
# Verifique se existe:
Get-Content .env

# Se não existir, volte ao Passo 1
```

---

### ❌ Erro: "Can't reach database server"

**Causa:** Senha incorreta ou PostgreSQL não está rodando.

**Solução:**
```powershell
# Teste a conexão manualmente:
psql -U postgres -d lf_services -c "SELECT COUNT(*) FROM products;"

# Se funcionar, copie a mesma senha para o .env
```

---

### ❌ Erro: "Port 3000 already in use"

**Causa:** Outro processo está usando a porta 3000.

**Solução:**
```powershell
# Use outra porta:
$env:PORT=3001; npm run dev

# Ou mate o processo na porta 3000:
netstat -ano | findstr :3000
# Anote o PID e execute:
taskkill /PID <PID> /F
```

---

### ❌ Erro: "Module not found: Can't resolve '@/components/...'"

**Causa:** Dependências não instaladas.

**Solução:**
```powershell
npm install
```

---

### ❌ API retorna erro 500

**Causa:** Prisma Client não foi gerado ou banco não está acessível.

**Solução:**
```powershell
npm run prisma:generate
npx prisma studio  # Teste se consegue ver os dados
```

---

## 📊 Endpoints Disponíveis

### Produtos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products/featured` | Produtos em destaque |
| GET | `/api/products/[id]` | Detalhes de um produto |
| GET | `/api/products/search?query=freio` | Busca por texto |
| POST | `/api/products/search` | Busca avançada (com filtros) |

### Veículos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/vehicles/manufacturers` | Lista de montadoras |
| GET | `/api/vehicles/[id]?type=CAR` | Veículos de uma montadora |

---

## ✅ Checklist Final

Execute e marque cada item:

- [ ] **Passo 1:** Arquivo `.env` criado com senha correta
- [ ] **Passo 2:** `npm install` executado sem erros
- [ ] **Passo 3:** `npm run prisma:generate` executado
- [ ] **Passo 4:** `npx prisma studio` abre e mostra dados
- [ ] **Passo 5:** `npm run dev` rodando (terminal aberto)
- [ ] **Passo 6:** APIs retornam JSON correto
- [ ] **Passo 7:** http://localhost:3000 carrega a página

---

## 🎉 Tudo Funcionando?

Se todos os itens acima estão marcados, **parabéns!** 🎊

Você tem:
- ✅ API funcionando (Backend)
- ✅ Frontend conectado à API
- ✅ Banco de dados PostgreSQL integrado
- ✅ 8 produtos cadastrados
- ✅ Sistema completo rodando

---

## 🔧 Comandos Úteis

### Parar o servidor:
```powershell
Ctrl+C  # No terminal onde está rodando npm run dev
```

### Reiniciar o servidor:
```powershell
npm run dev
```

### Ver logs do servidor:
Os logs aparecem no terminal onde você executou `npm run dev`

### Abrir Prisma Studio (visualizar banco):
```powershell
npx prisma studio
```

---

## 📝 Resumo dos Comandos

```powershell
# 1. Navegar para o projeto
cd "c:\Users\Litien\source\repos\Automotors Garagem"

# 2. Criar .env (se ainda não criou)
# (Copie o comando do Passo 1)

# 3. Instalar dependências
npm install

# 4. Gerar Prisma Client
npm run prisma:generate

# 5. Rodar o servidor
npm run dev

# 6. Abrir no navegador
# http://localhost:3000
```

---

**Boa sorte!** 🚀

Se tiver algum erro, volte à seção "Problemas Comuns" acima.
