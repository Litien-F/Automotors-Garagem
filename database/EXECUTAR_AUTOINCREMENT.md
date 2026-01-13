# ⚡ Execução com IDs Auto-Incrementados

## 🎯 Scripts com Auto-Increment

Use estes arquivos para ter **IDs numéricos auto-incrementados** (1, 2, 3...):

- ✅ `01_create_tables_autoincrement.sql` - Cria tabelas com BIGSERIAL
- ✅ `02_seed_data_autoincrement.sql` - Insere dados sem IDs fixos

---

## 🚀 Como Executar

### Opção 1: pgAdmin (Interface Gráfica)

1. **Abra o pgAdmin**
2. **Conecte ao banco `lf_services`**
3. **Abra Query Tool** (botão direito no banco → Query Tool)

4. **Execute o primeiro script:**
   - Menu: `File` → `Open`
   - Selecione: `01_create_tables_autoincrement.sql`
   - Clique em ▶️ **Execute** (ou F5)
   - Aguarde concluir

5. **Execute o segundo script:**
   - Menu: `File` → `Open`
   - Selecione: `02_seed_data_autoincrement.sql`
   - Clique em ▶️ **Execute** (ou F5)
   - Aguarde concluir

---

### Opção 2: Terminal psql

```powershell
cd "c:\Users\Litien\source\repos\Automotors Garagem\database"

# 1. Criar tabelas:
psql -U postgres -d lf_services -f 01_create_tables_autoincrement.sql

# 2. Inserir dados:
psql -U postgres -d lf_services -f 02_seed_data_autoincrement.sql
```

---

## ✅ Verificar se Funcionou

```sql
-- Ver os IDs auto-incrementados:
SELECT id, name FROM manufacturers ORDER BY id;
-- Resultado: 1=Volkswagen, 2=Chevrolet, 3=Fiat, etc.

SELECT id, name, price FROM products ORDER BY id;
-- Resultado: 1=Pastilha, 2=Filtro, 3=Amortecedor, etc.

-- Contar registros:
SELECT 
    (SELECT COUNT(*) FROM manufacturers) AS montadoras,
    (SELECT COUNT(*) FROM vehicles) AS veiculos,
    (SELECT COUNT(*) FROM products) AS produtos;
-- Resultado esperado: 8, 13, 8
```

---

## 🔢 Diferenças dos IDs

### Antes (VARCHAR com UUIDs):
```sql
id VARCHAR(30) PRIMARY KEY DEFAULT gen_random_uuid()::TEXT
-- Resultado: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
```

### Agora (BIGSERIAL auto-increment):
```sql
id BIGSERIAL PRIMARY KEY
-- Resultado: 1, 2, 3, 4, 5...
```

---

## 💡 Vantagens do Auto-Increment

✅ **IDs curtos e legíveis** (1, 2, 3...)  
✅ **Mais rápido** (índices menores)  
✅ **Mais fácil de debugar**  
✅ **Compatível com ORMs**  
✅ **Menos espaço no banco**  

---

## ⚠️ Importante

Se você já executou os scripts antigos (com VARCHAR), você precisa:

1. **Apagar as tabelas antigas:**
```sql
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

2. **Executar os novos scripts:**
```powershell
psql -U postgres -d lf_services -f 01_create_tables_autoincrement.sql
psql -U postgres -d lf_services -f 02_seed_data_autoincrement.sql
```

---

## 🎉 Pronto!

Agora você tem:
- ✅ IDs auto-incrementados (1, 2, 3...)
- ✅ Banco mais eficiente
- ✅ Dados de exemplo inseridos

**Próximo passo:** Configure o `.env` e rode `npm run dev`! 🚀
