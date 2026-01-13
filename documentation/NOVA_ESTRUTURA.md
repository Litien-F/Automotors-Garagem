# 🏗️ Nova Estrutura - Clean Architecture + Atomic Design

## 📂 Estrutura de Diretórios

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # Backend API Routes (TypeScript)
│   │   ├── products/
│   │   │   ├── route.ts         # GET /api/products
│   │   │   └── [id]/
│   │   │       └── route.ts     # GET /api/products/:id
│   │   └── contact/
│   │       └── route.ts         # POST /api/contact
│   ├── layout.tsx               # Layout raiz
│   └── page.tsx                 # Página principal
│
├── components/                   # Atomic Design
│   ├── atoms/                   # Componentes básicos
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.module.css
│   │   ├── Input/
│   │   ├── Card/
│   │   └── Icon/
│   │
│   ├── molecules/               # Combinação de átomos
│   │   ├── ProductCard/
│   │   ├── SearchBar/
│   │   └── ContactForm/
│   │
│   ├── organisms/               # Seções complexas
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── ProductGrid/
│   │   ├── AboutSection/
│   │   └── Footer/
│   │
│   └── templates/               # Layouts de página
│       └── MainTemplate/
│
├── core/                        # Clean Architecture - Camada Core
│   ├── domain/                  # Entidades e regras de negócio
│   │   ├── entities/
│   │   │   ├── Product.ts
│   │   │   ├── Category.ts
│   │   │   └── Vehicle.ts
│   │   └── repositories/        # Interfaces (contratos)
│   │       ├── IProductRepository.ts
│   │       └── IVehicleRepository.ts
│   │
│   └── usecases/                # Casos de uso (lógica de aplicação)
│       ├── GetProducts.ts
│       ├── SearchProducts.ts
│       └── GetProductById.ts
│
├── infrastructure/              # Clean Architecture - Camada Externa
│   ├── database/
│   │   ├── prisma.ts           # Cliente Prisma
│   │   └── repositories/        # Implementações concretas
│   │       ├── ProductRepository.ts
│   │       └── VehicleRepository.ts
│   │
│   └── http/                    # Clientes HTTP (se necessário)
│       └── api-client.ts
│
├── presentation/                # Camada de Apresentação
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useProducts.ts
│   │   └── useScrollPosition.ts
│   │
│   └── styles/                  # Estilos globais
│       ├── globals.css
│       ├── variables.css
│       └── animations.css
│
└── shared/                      # Código compartilhado
    ├── types/
    │   ├── api.types.ts
    │   └── product.types.ts
    ├── utils/
    │   ├── formatters.ts
    │   └── validators.ts
    └── constants/
        └── app.constants.ts
```

## 🎯 Princípios Aplicados

### 1. **Clean Architecture**
- **Domain (Core):** Entidades e regras de negócio independentes
- **Use Cases:** Lógica de aplicação
- **Infrastructure:** Implementações concretas (Prisma, APIs)
- **Presentation:** UI e interação com usuário

### 2. **Atomic Design**
- **Atoms:** Componentes indivisíveis (Button, Input)
- **Molecules:** Combinação de átomos (ProductCard)
- **Organisms:** Seções complexas (Header, Footer)
- **Templates:** Layouts de página

### 3. **SOLID**
- **S**ingle Responsibility: Cada componente/classe tem uma única responsabilidade
- **O**pen/Closed: Aberto para extensão, fechado para modificação
- **L**iskov Substitution: Interfaces bem definidas
- **I**nterface Segregation: Interfaces específicas
- **D**ependency Inversion: Dependências apontam para abstrações

### 4. **DRY (Don't Repeat Yourself)**
- Reutilização de componentes
- Estilos compartilhados via CSS Modules
- Hooks customizados para lógica compartilhada

## 🎨 Stack Tecnológica

- **Frontend:** React + TypeScript + CSS Modules
- **Backend:** Next.js API Routes + TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Styling:** CSS puro (sem Tailwind) + CSS Modules
- **Animações:** CSS Animations + Intersection Observer
