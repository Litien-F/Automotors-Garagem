# ⚡ EXECUTAR AGORA - Guia Rápido

## ✅ Atualizações Feitas

1. ✅ `prisma/schema.prisma` - Atualizado para usar BigInt (auto-increment)
2. ✅ `env.template` - Criado com template de configuração

---

## 🚀 Próximos Passos (Execute na Ordem)

### 1️⃣ Criar o arquivo `.env`

**Copie e cole no PowerShell:**

```powershell
@"
DATABASE_URL="postgresql://postgres:SUA_SENHA_AQUI@localhost:5432/lf_services?schema=public"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
"@ | Out-File -FilePath .env -Encoding utf8
```

**⚠️ IMPORTANTE:** Depois edite o `.env` e substitua `SUA_SENHA_AQUI` pela senha real do PostgreSQL!

---

### 2️⃣ Instalar Dependências

```powershell
npm install
```

---

### 3️⃣ Gerar Prisma Client

```powershell
npm run prisma:generate
```

**Saída esperada:**
```
✔ Generated Prisma Client (5.9.0)
```

---

### 4️⃣ Rodar o Projeto

```powershell
npm run dev
```

**Saída esperada:**
```
▲ Next.js 14.2.0
- Local:        http://localhost:3000
✓ Ready in 2.5s
```

---

### 5️⃣ Testar a API

**Abra no navegador:**

1. http://localhost:3000/api/vehicles/manufacturers
2. http://localhost:3000/api/products/featured

**Se retornar JSON com dados, está funcionando!** ✅

---

## 🐛 Se Der Erro

### Erro: "Environment variable not found: DATABASE_URL"

**Solução:** O arquivo `.env` não foi criado ou está no lugar errado.

```powershell
# Verifique se existe:
Get-Content .env

# Se não existir, crie manualmente:
# 1. Crie um arquivo chamado .env na raiz
# 2. Cole o conteúdo:
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/lf_services?schema=public"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

### Erro: "Can't reach database server"

**Solução:** Senha incorreta no `.env`

```powershell
# Teste a conexão manualmente:
psql -U postgres -d lf_services -c "SELECT COUNT(*) FROM products;"

# Se funcionar, copie a mesma senha para o .env
```

---

### Erro: "Prisma Client not generated"

**Solução:**
```powershell
npm run prisma:generate
```

---

## ✅ Checklist Final

Execute cada comando e marque:

- [ ] `npm install` - Instalou sem erros
- [ ] `npm run prisma:generate` - Gerou o Prisma Client
- [ ] `npm run dev` - Servidor rodando
- [ ] http://localhost:3000 - Página inicial carrega
- [ ] http://localhost:3000/api/vehicles/manufacturers - Retorna JSON

---

## 🎉 Tudo Funcionando?

Se todos os itens acima estão marcados, **parabéns!** 🎊

Seu e-commerce está rodando com:
- ✅ Banco de dados PostgreSQL conectado
- ✅ 8 produtos cadastrados
- ✅ API funcionando
- ✅ Frontend rodando

---

## 📞 Comando de Diagnóstico

Se ainda tiver problemas, execute:

```powershell
npx prisma studio
```

Isso abrirá uma interface visual em http://localhost:5555

Se conseguir ver os dados lá, o problema é no Next.js, não no banco.

---

**Boa sorte!** 🚀
