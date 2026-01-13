-- ============================================
-- AUTOMOTORS GARAGEM - DADOS DE EXEMPLO (SEED)
-- Banco de Dados: lf_services
-- IDs AUTO-INCREMENTADOS
-- ============================================


-- ============================================
-- LIMPAR DADOS EXISTENTES (CUIDADO!)
-- ============================================

TRUNCATE TABLE order_items CASCADE;
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE cart_items CASCADE;
TRUNCATE TABLE vehicle_compatibilities CASCADE;
TRUNCATE TABLE product_images CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE categories CASCADE;
TRUNCATE TABLE vehicle_variants CASCADE;
TRUNCATE TABLE vehicles CASCADE;
TRUNCATE TABLE manufacturers CASCADE;
TRUNCATE TABLE addresses CASCADE;
TRUNCATE TABLE users CASCADE;

-- Resetar sequences (auto-increment)
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE addresses_id_seq RESTART WITH 1;
ALTER SEQUENCE manufacturers_id_seq RESTART WITH 1;
ALTER SEQUENCE vehicles_id_seq RESTART WITH 1;
ALTER SEQUENCE vehicle_variants_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE product_images_id_seq RESTART WITH 1;
ALTER SEQUENCE vehicle_compatibilities_id_seq RESTART WITH 1;
ALTER SEQUENCE cart_items_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE order_items_id_seq RESTART WITH 1;

-- ============================================
-- INSERIR MONTADORAS
-- ============================================

INSERT INTO manufacturers (name, slug, country) VALUES
('Volkswagen', 'volkswagen', 'Alemanha'),
('Chevrolet', 'chevrolet', 'Estados Unidos'),
('Fiat', 'fiat', 'Itália'),
('Ford', 'ford', 'Estados Unidos'),
('Honda', 'honda', 'Japão'),
('Toyota', 'toyota', 'Japão'),
('Hyundai', 'hyundai', 'Coreia do Sul'),
('Nissan', 'nissan', 'Japão');

-- ============================================
-- INSERIR VEÍCULOS
-- ============================================

-- Volkswagen (manufacturer_id = 1)
INSERT INTO vehicles (manufacturer_id, name, slug, type) VALUES
(1, 'Gol', 'gol', 'CAR'),
(1, 'Fusca', 'fusca', 'CAR'),
(1, 'Polo', 'polo', 'CAR');

-- Chevrolet (manufacturer_id = 2)
INSERT INTO vehicles (manufacturer_id, name, slug, type) VALUES
(2, 'Onix', 'onix', 'CAR'),
(2, 'Cruze', 'cruze', 'CAR');

-- Fiat (manufacturer_id = 3)
INSERT INTO vehicles (manufacturer_id, name, slug, type) VALUES
(3, 'Uno', 'uno', 'CAR'),
(3, 'Palio', 'palio', 'CAR');

-- Ford (manufacturer_id = 4)
INSERT INTO vehicles (manufacturer_id, name, slug, type) VALUES
(4, 'Fiesta', 'fiesta', 'CAR'),
(4, 'Ranger', 'ranger', 'TRUCK');

-- Honda (manufacturer_id = 5)
INSERT INTO vehicles (manufacturer_id, name, slug, type) VALUES
(5, 'Civic', 'civic', 'CAR'),
(5, 'CG 160', 'cg-160', 'MOTORCYCLE');

-- Toyota (manufacturer_id = 6)
INSERT INTO vehicles (manufacturer_id, name, slug, type) VALUES
(6, 'Corolla', 'corolla', 'CAR'),
(6, 'Hilux', 'hilux', 'TRUCK');

-- ============================================
-- INSERIR VARIANTES DE VEÍCULOS
-- ============================================

-- Gol (vehicle_id = 1)
INSERT INTO vehicle_variants (vehicle_id, year, model, engine_type, fuel_type) VALUES
(1, 2020, '1.0', '1.0 12V', 'Flex'),
(1, 2021, '1.6', '1.6 16V', 'Flex'),
(1, 2022, '1.6', '1.6 16V', 'Flex');

-- Fusca (vehicle_id = 2) - carro antigo
INSERT INTO vehicle_variants (vehicle_id, year, model, engine_type, fuel_type) VALUES
(2, 1975, 'Padrão', '1.3', 'Gasolina'),
(2, 1980, 'Padrão', '1.6', 'Gasolina');

-- Civic (vehicle_id = 10)
INSERT INTO vehicle_variants (vehicle_id, year, model, engine_type, fuel_type) VALUES
(10, 2022, 'EX', '2.0 16V', 'Gasolina'),
(10, 2023, 'EX', '2.0 16V', 'Gasolina');

-- Corolla (vehicle_id = 12)
INSERT INTO vehicle_variants (vehicle_id, year, model, engine_type, fuel_type) VALUES
(12, 2022, 'XEi', '2.0 16V', 'Flex'),
(12, 2023, 'XEi', '2.0 16V', 'Flex');

-- ============================================
-- INSERIR CATEGORIAS
-- ============================================

INSERT INTO categories (name, slug, description) VALUES
('Motor', 'motor', 'Peças relacionadas ao motor'),
('Freios', 'freios', 'Sistema de freios'),
('Suspensão', 'suspensao', 'Sistema de suspensão'),
('Elétrica', 'eletrica', 'Sistema elétrico'),
('Carroceria', 'carroceria', 'Peças de carroceria'),
('Transmissão', 'transmissao', 'Sistema de transmissão'),
('Arrefecimento', 'arrefecimento', 'Sistema de arrefecimento');

-- ============================================
-- INSERIR PRODUTOS
-- ============================================

-- Produto 1: Pastilha de Freio (category_id = 2 - Freios)
INSERT INTO products (category_id, sku, name, slug, description, price, compare_at_price, stock, is_active, is_featured, brand, part_number) VALUES
(2, 'PF-001', 'Pastilha de Freio Dianteira', 'pastilha-freio-dianteira',
'Pastilha de freio dianteira de alta qualidade, compatível com diversos modelos. Material cerâmico que proporciona frenagem suave e silenciosa.',
89.90, 120.00, 50, TRUE, TRUE, 'Bosch', 'BN-1234');

-- Produto 2: Filtro de Óleo (category_id = 1 - Motor)
INSERT INTO products (category_id, sku, name, slug, description, price, stock, is_active, is_featured, brand, part_number) VALUES
(1, 'FO-002', 'Filtro de Óleo', 'filtro-oleo',
'Filtro de óleo original, alta eficiência de filtragem. Remove impurezas e protege o motor.',
35.00, 100, TRUE, TRUE, 'Mann Filter', 'MF-5678');

-- Produto 3: Amortecedor Fusca (category_id = 3 - Suspensão) - RARO
INSERT INTO products (category_id, sku, name, slug, description, price, compare_at_price, stock, is_active, is_featured, is_rare, brand, part_number) VALUES
(3, 'AM-003', 'Amortecedor Dianteiro Fusca', 'amortecedor-fusca',
'Amortecedor dianteiro original para Fusca. Peça rara de colecionador. Restauração autêntica.',
450.00, 600.00, 5, TRUE, TRUE, TRUE, 'Cofap', 'CF-FUSCA-75');

-- Produto 4: Bateria (category_id = 4 - Elétrica)
INSERT INTO products (category_id, sku, name, slug, description, price, stock, is_active, brand, part_number, weight) VALUES
(4, 'BT-004', 'Bateria 60Ah', 'bateria-60ah',
'Bateria automotiva 60Ah, 12V. Garantia de 18 meses. Alta durabilidade e confiabilidade.',
380.00, 30, TRUE, 'Moura', 'MR-60AH', 15.5);

-- Produto 5: Farol LED (category_id = 4 - Elétrica)
INSERT INTO products (category_id, sku, name, slug, description, price, compare_at_price, stock, is_active, is_featured, brand, part_number) VALUES
(4, 'FL-005', 'Farol Dianteiro LED', 'farol-led',
'Farol dianteiro com tecnologia LED. Maior visibilidade e economia de energia. Design moderno.',
650.00, 850.00, 15, TRUE, TRUE, 'Arteb', 'AT-LED-001');

-- Produto 6: Disco de Freio (category_id = 2 - Freios)
INSERT INTO products (category_id, sku, name, slug, description, price, stock, is_active, brand, part_number, weight) VALUES
(2, 'DF-006', 'Disco de Freio Ventilado', 'disco-freio-ventilado',
'Disco de freio ventilado, maior dissipação de calor. Compatível com diversos modelos.',
180.00, 40, TRUE, 'Fremax', 'FX-9876', 8.2);

-- Produto 7: Vela de Ignição (category_id = 1 - Motor)
INSERT INTO products (category_id, sku, name, slug, description, price, stock, is_active, is_featured, brand, part_number) VALUES
(1, 'VI-007', 'Vela de Ignição (Jogo com 4)', 'vela-ignicao',
'Jogo com 4 velas de ignição de alta performance. Melhora a queima de combustível.',
85.00, 80, TRUE, TRUE, 'NGK', 'NGK-4321');

-- Produto 8: Radiador (category_id = 7 - Arrefecimento)
INSERT INTO products (category_id, sku, name, slug, description, price, stock, is_active, brand, part_number, weight) VALUES
(7, 'RD-008', 'Radiador de Água', 'radiador-agua',
'Radiador de água com alta capacidade de resfriamento. Alumínio de qualidade.',
420.00, 20, TRUE, 'Visconde', 'VC-RAD-001', 12.0);

-- ============================================
-- INSERIR IMAGENS DOS PRODUTOS
-- ============================================

-- Os IDs dos produtos são 1 a 8 (auto-incrementados)
INSERT INTO product_images (product_id, url, alt, "order") VALUES
(1, 'https://placehold.co/600x400/1a1a1a/f97316?text=Pastilha+Freio', 'Pastilha de Freio Dianteira', 0),
(2, 'https://placehold.co/600x400/1a1a1a/0ea5e9?text=Filtro+Oleo', 'Filtro de Óleo', 0),
(3, 'https://placehold.co/600x400/1a1a1a/f97316?text=Amortecedor+Fusca', 'Amortecedor Fusca', 0),
(4, 'https://placehold.co/600x400/1a1a1a/0ea5e9?text=Bateria', 'Bateria 60Ah', 0),
(5, 'https://placehold.co/600x400/1a1a1a/f97316?text=Farol+LED', 'Farol LED', 0),
(6, 'https://placehold.co/600x400/1a1a1a/0ea5e9?text=Disco+Freio', 'Disco de Freio', 0),
(7, 'https://placehold.co/600x400/1a1a1a/f97316?text=Vela+Ignicao', 'Vela de Ignição', 0),
(8, 'https://placehold.co/600x400/1a1a1a/0ea5e9?text=Radiador', 'Radiador', 0);

-- ============================================
-- INSERIR COMPATIBILIDADES
-- ============================================

-- Pastilha de Freio (product_id = 1) - compatível com vários carros
INSERT INTO vehicle_compatibilities (product_id, vehicle_id, variant_id) VALUES
(1, 1, 1),  -- Gol 2020 1.0
(1, 1, 2),  -- Gol 2021 1.6
(1, 4, NULL),  -- Onix (todas as variantes)
(1, 3, NULL);  -- Polo (todas as variantes)

-- Filtro de Óleo (product_id = 2) - compatível com vários
INSERT INTO vehicle_compatibilities (product_id, vehicle_id) VALUES
(2, 1),  -- Gol
(2, 4),  -- Onix
(2, 10), -- Civic
(2, 12); -- Corolla

-- Amortecedor Fusca (product_id = 3) - específico
INSERT INTO vehicle_compatibilities (product_id, vehicle_id, variant_id) VALUES
(3, 2, 4),  -- Fusca 1975
(3, 2, 5);  -- Fusca 1980

-- Bateria (product_id = 4) - compatível com vários
INSERT INTO vehicle_compatibilities (product_id, vehicle_id) VALUES
(4, 1),  -- Gol
(4, 4),  -- Onix
(4, 6),  -- Uno
(4, 7);  -- Palio

-- Farol LED (product_id = 5) - específico para Civic
INSERT INTO vehicle_compatibilities (product_id, vehicle_id, variant_id) VALUES
(5, 10, 6),  -- Civic 2022 EX
(5, 10, 7);  -- Civic 2023 EX

-- Disco de Freio (product_id = 6)
INSERT INTO vehicle_compatibilities (product_id, vehicle_id) VALUES
(6, 1),  -- Gol
(6, 3),  -- Polo
(6, 4);  -- Onix

-- Vela de Ignição (product_id = 7)
INSERT INTO vehicle_compatibilities (product_id, vehicle_id) VALUES
(7, 1),  -- Gol
(7, 6),  -- Uno
(7, 8);  -- Fiesta

-- Radiador (product_id = 8)
INSERT INTO vehicle_compatibilities (product_id, vehicle_id) VALUES
(8, 10), -- Civic
(8, 12); -- Corolla

-- ============================================
-- INSERIR USUÁRIO DE TESTE
-- ============================================

-- Senha: 123456 (em produção, use hash bcrypt real)
INSERT INTO users (email, name, password, role, cpf, phone) VALUES
('admin@automotors.com', 'Administrador', '$2a$10$XQKvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', 'ADMIN', '123.456.789-00', '(88) 98765-4321'),
('cliente@email.com', 'João Silva', '$2a$10$XQKvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', 'CUSTOMER', '987.654.321-00', '(88) 91234-5678');

-- ============================================
-- INSERIR ENDEREÇO DE TESTE
-- ============================================

-- user_id = 2 (João Silva)
INSERT INTO addresses (user_id, street, number, complement, neighborhood, city, state, zip_code, is_default) VALUES
(2, 'Rua das Flores', '123', 'Apto 45', 'Centro', 'São Paulo', 'SP', '01234-567', TRUE);

-- ============================================
-- MENSAGEM DE SUCESSO
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Dados de exemplo inseridos com sucesso!';
    RAISE NOTICE '📊 Resumo:';
    RAISE NOTICE '   - 8 Montadoras';
    RAISE NOTICE '   - 13 Veículos';
    RAISE NOTICE '   - 9 Variantes';
    RAISE NOTICE '   - 7 Categorias';
    RAISE NOTICE '   - 8 Produtos';
    RAISE NOTICE '   - 8 Imagens';
    RAISE NOTICE '   - 23 Compatibilidades';
    RAISE NOTICE '   - 2 Usuários de teste';
    RAISE NOTICE '   - 1 Endereço';
    RAISE NOTICE '🔢 Todos os IDs foram gerados automaticamente!';
END $$;
