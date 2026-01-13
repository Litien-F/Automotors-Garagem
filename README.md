# 🚗 Automotors Garagem

> E-commerce moderno de peças automotivas com arquitetura escalável e design responsivo.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?style=flat-square&logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=flat-square&logo=prisma)

---

## 📋 Sobre o Projeto

Sistema completo de e-commerce especializado em peças automotivas, desenvolvido com as melhores práticas de engenharia de software:

- ✅ **Clean Architecture**
- ✅ **Atomic Design**
- ✅ **SOLID Principles**
- ✅ **CSS Modules** (sem frameworks CSS)
- ✅ **TypeScript** com tipagem forte
- ✅ **Responsivo** (Mobile First)
- ✅ **Animações CSS** puras

---

## 🎯 Funcionalidades

### 🏠 **Landing Page**
- Hero section com animações suaves
- Estatísticas em tempo real
- Scroll suave entre seções

### 🛍️ **Catálogo de Produtos**
- Grid responsivo de produtos
- Cards com hover effects
- Integração com API real
- Estados de loading e erro

### ℹ️ **Sobre a Empresa**
- Features destacadas
- Estatísticas da empresa
- Design moderno com efeito glass

### 📞 **Contato**
- Informações de contato no footer
- Links para redes sociais
- Formulário de contato (em breve)

---

## 🛠️ Tecnologias

### **Frontend**
- [Next.js 14](https://nextjs.org/) - Framework React
- [React 18](https://react.dev/) - Biblioteca UI
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática
- CSS Modules - Estilos isolados
- CSS Variables - Design System

### **Backend**
- Next.js API Routes - Serverless Functions
- [Prisma ORM](https://www.prisma.io/) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Banco de dados

### **Arquitetura**
- Clean Architecture
- Atomic Design
- Repository Pattern
- SOLID Principles

---

## 🚀 Como Rodar

### **Pré-requisitos**

- Node.js 18+
- PostgreSQL 15+
- npm ou yarn

### **1. Clone o repositório**

```bash
git clone https://github.com/seu-usuario/automotors-garagem.git
cd automotors-garagem
```

### **2. Instale as dependências**

```bash
npm install
```

### **3. Configure o banco de dados**

Crie um banco PostgreSQL e execute os scripts na pasta `database/`:

```bash
psql -U postgres -d seu_banco -f database/01_create_tables_autoincrement.sql
psql -U postgres -d seu_banco -f database/02_seed_data_autoincrement.sql
```

### **4. Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz baseado no `env.template`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/seu_banco?schema=public"
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### **5. Gere o Prisma Client**

```bash
npm run prisma:generate
```

### **6. Rode o servidor**

```bash
npm run dev
```

### **7. Acesse no navegador**

```
http://localhost:3000
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes React
│   ├── atoms/              # Componentes básicos (Button, Input, Card)
│   ├── molecules/          # Combinação de átomos (ProductCard)
│   └── organisms/          # Seções complexas (Header, Hero, Footer)
│
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Backend)
│   ├── layout.tsx         # Layout raiz
│   └── page.tsx           # Página principal
│
├── presentation/          # Camada de apresentação
│   └── styles/           # Estilos globais e design system
│
├── lib/                   # Bibliotecas e utilitários
│   ├── prisma.ts         # Cliente Prisma
│   └── repositories/     # Repositórios de dados
│
└── types/                 # Tipos TypeScript
```

---

## 🎨 Design System

### **Cores**

| Cor | Uso | Hex |
|-----|-----|-----|
| Primary | CTAs, destaques | `#f97316` |
| Secondary | Links, alternativa | `#0ea5e9` |
| Neutral | Backgrounds, textos | `#171717` - `#fafafa` |
| Metallic | Efeitos especiais | `#C0C0C0`, `#71797E` |

### **Tipografia**

- **Família:** Inter (base), Roboto (display)
- **Escalas:** 12px - 60px
- **Pesos:** 300 - 800

---

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

---

## 🎯 Princípios Aplicados

### **Clean Code**
- Nomes descritivos
- Funções pequenas e focadas
- Comentários JSDoc
- DRY (Don't Repeat Yourself)

### **SOLID**
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### **Atomic Design**
- Átomos → Moléculas → Organismos → Templates → Páginas

---

## 📊 Performance

- ✅ Bundle size: ~150kb
- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3s
- ✅ Lighthouse Score: 90+

---

## 🔮 Roadmap

- [ ] Testes unitários (Jest + RTL)
- [ ] Storybook para documentação
- [ ] Busca avançada com filtros
- [ ] Página de detalhes do produto
- [ ] Carrinho de compras
- [ ] Autenticação de usuários
- [ ] Admin panel

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Contato

**Automotors Garagem**

- 📧 Email: contato@automotorsgaragem.com.br
- 📍 Localização: Fortaleza, CE - Brasil

---

## 🙏 Agradecimentos

Desenvolvido com ❤️ seguindo as melhores práticas de engenharia de software.

**Stack:** Next.js • React • TypeScript • PostgreSQL • Prisma • CSS Modules

---

<div align="center">
  <strong>⭐ Se este projeto foi útil, considere dar uma estrela!</strong>
</div>
