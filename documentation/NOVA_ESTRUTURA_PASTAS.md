# 🏗️ NOVA ESTRUTURA DE PASTAS

## 📁 Estrutura Reorganizada

```
src/
├── frontend/              # 🎨 FRONTEND (React/Next.js)
│   ├── components/       # Componentes React
│   │   ├── atoms/       # Componentes básicos
│   │   ├── molecules/   # Combinação de átomos
│   │   └── organisms/   # Seções complexas
│   ├── styles/          # Estilos CSS
│   │   ├── globals.css
│   │   ├── variables.css
│   │   └── animations.css
│   ├── hooks/           # Custom React Hooks
│   └── utils/           # Utilitários do frontend
│       └── cn.ts
│
├── backend/              # 🔧 BACKEND (API Routes)
│   └── api/             # Next.js API Routes
│       ├── products/
│       └── vehicles/
│
├── services/            # 📊 SERVICES (Arquitetura de Dados)
│   ├── database/       # Configuração do banco
│   │   └── prisma.ts
│   ├── repositories/   # Repositórios de dados
│   │   ├── ProductRepository.ts
│   │   └── VehicleRepository.ts
│   ├── types/          # Tipos TypeScript
│   │   └── index.ts
│   └── bigint-serializer.ts
│
└── app/                 # Next.js App Router
    ├── layout.tsx
    └── page.tsx
```

---

## 🔄 IMPORTS QUE PRECISAM SER ATUALIZADOS

### **1. Componentes (Frontend)**

**Antes:**
```typescript
import Button from '@/components/atoms/Button/Button'
import ProductCard from '@/components/molecules/ProductCard/ProductCard'
```

**Depois:**
```typescript
import Button from '@/frontend/components/atoms/Button/Button'
import ProductCard from '@/frontend/components/molecules/ProductCard/ProductCard'
```

### **2. Estilos (Frontend)**

**Antes:**
```typescript
import '@/styles/globals.css'
import '@/presentation/styles/variables.css'
```

**Depois:**
```typescript
import '@/frontend/styles/globals.css'
import '@/frontend/styles/variables.css'
```

### **3. API Routes (Backend)**

**Antes:**
```typescript
import { productRepository } from '@/lib/repositories/ProductRepository'
import { jsonResponse } from '@/shared/utils/bigint-serializer'
```

**Depois:**
```typescript
import { productRepository } from '@/services/repositories/ProductRepository'
import { jsonResponse } from '@/services/bigint-serializer'
```

### **4. Repositories (Services)**

**Antes:**
```typescript
import prisma from '@/lib/prisma'
import { SearchParams } from '@/types'
```

**Depois:**
```typescript
import prisma from '@/services/database/prisma'
import { SearchParams } from '@/services/types'
```

### **5. Utils (Frontend)**

**Antes:**
```typescript
import { cn } from '@/utils/cn'
```

**Depois:**
```typescript
import { cn } from '@/frontend/utils/cn'
```

---

## 📋 ARQUIVOS QUE PRECISAM SER ATUALIZADOS

### **Frontend (Components)**
- [ ] `src/frontend/components/organisms/Header/Header.tsx`
- [ ] `src/frontend/components/organisms/Hero/Hero.tsx`
- [ ] `src/frontend/components/organisms/ProductsSection/ProductsSection.tsx`
- [ ] `src/frontend/components/organisms/AboutSection/AboutSection.tsx`
- [ ] `src/frontend/components/organisms/Footer/Footer.tsx`
- [ ] `src/app/page.tsx`

### **Backend (API Routes)**
- [ ] `src/backend/api/products/featured/route.ts`
- [ ] `src/backend/api/products/[id]/route.ts`
- [ ] `src/backend/api/products/search/route.ts`
- [ ] `src/backend/api/vehicles/manufacturers/route.ts`
- [ ] `src/backend/api/vehicles/[manufacturerId]/route.ts`

### **Services (Repositories)**
- [ ] `src/services/repositories/ProductRepository.ts`
- [ ] `src/services/repositories/VehicleRepository.ts`

### **App Router**
- [ ] `src/app/layout.tsx`

---

## 🔧 ATUALIZAR tsconfig.json

Adicione os novos paths:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/frontend/*": ["./src/frontend/*"],
      "@/backend/*": ["./src/backend/*"],
      "@/services/*": ["./src/services/*"]
    }
  }
}
```

---

## 🎯 BENEFÍCIOS DA NOVA ESTRUTURA

### ✅ **Separação Clara de Responsabilidades**
- **Frontend:** Tudo relacionado à UI
- **Backend:** Todas as APIs
- **Services:** Toda a lógica de dados

### ✅ **Escalabilidade**
- Fácil adicionar novos componentes
- Fácil adicionar novas APIs
- Fácil adicionar novos repositórios

### ✅ **Manutenibilidade**
- Código organizado por camada
- Fácil encontrar arquivos
- Fácil entender a arquitetura

### ✅ **Testabilidade**
- Cada camada pode ser testada independentemente
- Mocks mais fáceis de criar
- Testes mais organizados

---

## 📝 PRÓXIMOS PASSOS

1. ✅ Estrutura de pastas criada
2. ⏳ Atualizar imports em todos os arquivos
3. ⏳ Atualizar tsconfig.json
4. ⏳ Testar se tudo funciona
5. ⏳ Commitar mudanças

---

**Status:** 🟡 **EM PROGRESSO**
