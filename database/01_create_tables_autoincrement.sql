-- ============================================
-- AUTOMOTORS GARAGEM - CRIAÇÃO DE TABELAS
-- Banco de Dados: lf_services
-- PostgreSQL 14+ com IDs AUTO-INCREMENTADOS
-- ============================================

-- Conectar ao banco de dados


-- ============================================
-- ENUMS (Tipos Enumerados)
-- ============================================

-- Tipo de veículo
CREATE TYPE vehicle_type AS ENUM ('CAR', 'MOTORCYCLE', 'TRUCK');

-- Papel do usuário
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'ADMIN', 'MANAGER');

-- Status do pedido
CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- ============================================
-- TABELA: users (Usuários)
-- ============================================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'CUSTOMER',
    cpf VARCHAR(14) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_cpf ON users(cpf);
CREATE INDEX idx_users_role ON users(role);

COMMENT ON TABLE users IS 'Usuários do sistema (clientes, admins, gerentes)';
COMMENT ON COLUMN users.role IS 'Papel do usuário: CUSTOMER, ADMIN, MANAGER';

-- ============================================
-- TABELA: addresses (Endereços)
-- ============================================

CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(20) NOT NULL,
    complement VARCHAR(100),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_addresses_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Índices para addresses
CREATE INDEX idx_addresses_user_id ON addresses(user_id);
CREATE INDEX idx_addresses_zip_code ON addresses(zip_code);

COMMENT ON TABLE addresses IS 'Endereços dos usuários';
COMMENT ON COLUMN addresses.is_default IS 'Indica se é o endereço padrão do usuário';

-- ============================================
-- TABELA: manufacturers (Montadoras)
-- ============================================

CREATE TABLE manufacturers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    logo_url TEXT,
    country VARCHAR(100),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Índices para manufacturers
CREATE INDEX idx_manufacturers_slug ON manufacturers(slug);
CREATE INDEX idx_manufacturers_name ON manufacturers(name);

COMMENT ON TABLE manufacturers IS 'Montadoras de veículos (Ford, Chevrolet, Honda, etc.)';

-- ============================================
-- TABELA: vehicles (Veículos)
-- ============================================

CREATE TABLE vehicles (
    id BIGSERIAL PRIMARY KEY,
    manufacturer_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    type vehicle_type NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vehicles_manufacturer FOREIGN KEY (manufacturer_id) REFERENCES manufacturers(id) ON DELETE CASCADE,
    CONSTRAINT uk_vehicles_manufacturer_slug UNIQUE (manufacturer_id, slug)
);

-- Índices para vehicles
CREATE INDEX idx_vehicles_manufacturer_id ON vehicles(manufacturer_id);
CREATE INDEX idx_vehicles_type ON vehicles(type);
CREATE INDEX idx_vehicles_slug ON vehicles(slug);

COMMENT ON TABLE vehicles IS 'Modelos de veículos (Civic, Corolla, F-150, etc.)';
COMMENT ON COLUMN vehicles.type IS 'Tipo: CAR (Carro), MOTORCYCLE (Moto), TRUCK (Caminhão)';

-- ============================================
-- TABELA: vehicle_variants (Variantes de Veículos)
-- ============================================

CREATE TABLE vehicle_variants (
    id BIGSERIAL PRIMARY KEY,
    vehicle_id BIGINT NOT NULL,
    year INTEGER NOT NULL,
    model VARCHAR(50),
    engine_type VARCHAR(50),
    fuel_type VARCHAR(30),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vehicle_variants_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    CONSTRAINT uk_vehicle_variants_vehicle_year_model UNIQUE (vehicle_id, year, model)
);

-- Índices para vehicle_variants
CREATE INDEX idx_vehicle_variants_vehicle_id ON vehicle_variants(vehicle_id);
CREATE INDEX idx_vehicle_variants_year ON vehicle_variants(year);

COMMENT ON TABLE vehicle_variants IS 'Variantes específicas de veículos (Ano + Modelo + Motor)';
COMMENT ON COLUMN vehicle_variants.year IS 'Ano do veículo';
COMMENT ON COLUMN vehicle_variants.model IS 'Modelo específico (EX, LX, Sport, etc.)';
COMMENT ON COLUMN vehicle_variants.engine_type IS 'Tipo de motor (1.8 16V, 2.0 Turbo, etc.)';
COMMENT ON COLUMN vehicle_variants.fuel_type IS 'Tipo de combustível (Gasolina, Flex, Diesel, etc.)';

-- ============================================
-- TABELA: categories (Categorias de Produtos)
-- ============================================

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    parent_id BIGINT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Índices para categories
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);

COMMENT ON TABLE categories IS 'Categorias de produtos (hierárquicas)';
COMMENT ON COLUMN categories.parent_id IS 'ID da categoria pai (para subcategorias)';

-- ============================================
-- TABELA: products (Produtos/Peças)
-- ============================================

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    compare_at_price DECIMAL(10, 2),
    stock INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_rare BOOLEAN NOT NULL DEFAULT FALSE,
    brand VARCHAR(100),
    part_number VARCHAR(100),
    weight DECIMAL(8, 2),
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    CONSTRAINT chk_products_price CHECK (price >= 0),
    CONSTRAINT chk_products_stock CHECK (stock >= 0)
);

-- Índices para products
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active_is_featured ON products(is_active, is_featured);
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('portuguese', name));
CREATE INDEX idx_products_description ON products USING gin(to_tsvector('portuguese', description));

COMMENT ON TABLE products IS 'Produtos/Peças automotivas';
COMMENT ON COLUMN products.sku IS 'Código único do produto (Stock Keeping Unit)';
COMMENT ON COLUMN products.compare_at_price IS 'Preço anterior (para mostrar desconto)';
COMMENT ON COLUMN products.is_rare IS 'Indica se é uma peça rara/antiga';
COMMENT ON COLUMN products.part_number IS 'Número original da peça';
COMMENT ON COLUMN products.weight IS 'Peso em quilogramas';

-- ============================================
-- TABELA: product_images (Imagens dos Produtos)
-- ============================================

CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    url TEXT NOT NULL,
    alt VARCHAR(255),
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Índices para product_images
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_order ON product_images("order");

COMMENT ON TABLE product_images IS 'Imagens dos produtos';
COMMENT ON COLUMN product_images."order" IS 'Ordem de exibição das imagens';

-- ============================================
-- TABELA: vehicle_compatibilities (Compatibilidade Produto-Veículo)
-- ============================================

CREATE TABLE vehicle_compatibilities (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    vehicle_id BIGINT NOT NULL,
    variant_id BIGINT,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vehicle_compatibilities_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT fk_vehicle_compatibilities_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    CONSTRAINT fk_vehicle_compatibilities_variant FOREIGN KEY (variant_id) REFERENCES vehicle_variants(id) ON DELETE CASCADE,
    CONSTRAINT uk_vehicle_compatibilities_product_vehicle_variant UNIQUE (product_id, vehicle_id, variant_id)
);

-- Índices para vehicle_compatibilities
CREATE INDEX idx_vehicle_compatibilities_product_id ON vehicle_compatibilities(product_id);
CREATE INDEX idx_vehicle_compatibilities_vehicle_id ON vehicle_compatibilities(vehicle_id);
CREATE INDEX idx_vehicle_compatibilities_variant_id ON vehicle_compatibilities(variant_id);

COMMENT ON TABLE vehicle_compatibilities IS 'Relacionamento entre produtos e veículos compatíveis';
COMMENT ON COLUMN vehicle_compatibilities.notes IS 'Observações sobre a compatibilidade';

-- ============================================
-- TABELA: cart_items (Itens do Carrinho)
-- ============================================

CREATE TABLE cart_items (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cart_items_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_cart_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    CONSTRAINT uk_cart_items_user_product UNIQUE (user_id, product_id),
    CONSTRAINT chk_cart_items_quantity CHECK (quantity > 0)
);

-- Índices para cart_items
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);

COMMENT ON TABLE cart_items IS 'Itens no carrinho de compras dos usuários';

-- ============================================
-- TABELA: orders (Pedidos)
-- ============================================

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_id BIGINT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    status order_status NOT NULL DEFAULT 'PENDING',
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping_cost DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_orders_address FOREIGN KEY (address_id) REFERENCES addresses(id) ON DELETE RESTRICT,
    CONSTRAINT chk_orders_subtotal CHECK (subtotal >= 0),
    CONSTRAINT chk_orders_shipping_cost CHECK (shipping_cost >= 0),
    CONSTRAINT chk_orders_discount CHECK (discount >= 0),
    CONSTRAINT chk_orders_total CHECK (total >= 0)
);

-- Índices para orders
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

COMMENT ON TABLE orders IS 'Pedidos dos clientes';
COMMENT ON COLUMN orders.order_number IS 'Número único do pedido (visível ao cliente)';
COMMENT ON COLUMN orders.status IS 'Status: PENDING, CONFIRMED, PROCESSING, SHIPPED, DELIVERED, CANCELLED';

-- ============================================
-- TABELA: order_items (Itens do Pedido)
-- ============================================

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    CONSTRAINT chk_order_items_quantity CHECK (quantity > 0),
    CONSTRAINT chk_order_items_unit_price CHECK (unit_price >= 0),
    CONSTRAINT chk_order_items_subtotal CHECK (subtotal >= 0)
);

-- Índices para order_items
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

COMMENT ON TABLE order_items IS 'Itens individuais de cada pedido';

-- ============================================
-- TRIGGERS (Atualização automática de updated_at)
-- ============================================

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas com updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_manufacturers_updated_at BEFORE UPDATE ON manufacturers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON vehicles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicle_variants_updated_at BEFORE UPDATE ON vehicle_variants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- MENSAGEM DE SUCESSO
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Todas as tabelas foram criadas com sucesso no banco lf_services!';
    RAISE NOTICE '📊 Total de tabelas: 13';
    RAISE NOTICE '🔗 Total de relacionamentos: 12';
    RAISE NOTICE '📇 Total de índices: 35+';
    RAISE NOTICE '🔢 IDs: BIGSERIAL (auto-incremento)';
END $$;
