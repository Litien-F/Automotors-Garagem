-- ============================================
-- AUTOMOTORS GARAGEM - CONSULTAS ÚTEIS
-- Banco de Dados: lf_services
-- ============================================

\c lf_services;

-- ============================================
-- 1. CONSULTAS DE PRODUTOS
-- ============================================

-- 1.1. Listar todos os produtos ativos com categoria
SELECT 
    p.id,
    p.sku,
    p.name,
    p.price,
    p.stock,
    p.is_featured,
    p.is_rare,
    c.name AS category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE p.is_active = TRUE
ORDER BY p.created_at DESC;

-- 1.2. Produtos em destaque
SELECT 
    p.id,
    p.name,
    p.price,
    p.compare_at_price,
    p.stock,
    ROUND(((p.compare_at_price - p.price) / p.compare_at_price * 100), 0) AS discount_percentage
FROM products p
WHERE p.is_active = TRUE 
  AND p.is_featured = TRUE
ORDER BY p.created_at DESC
LIMIT 8;

-- 1.3. Produtos raros/antigos
SELECT 
    p.id,
    p.name,
    p.price,
    p.stock,
    p.brand,
    p.part_number
FROM products p
WHERE p.is_active = TRUE 
  AND p.is_rare = TRUE
ORDER BY p.price DESC;

-- 1.4. Buscar produtos por texto (nome ou descrição)
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    ts_rank(to_tsvector('portuguese', p.name || ' ' || COALESCE(p.description, '')), 
            plainto_tsquery('portuguese', 'freio')) AS relevance
FROM products p
WHERE to_tsvector('portuguese', p.name || ' ' || COALESCE(p.description, '')) 
      @@ plainto_tsquery('portuguese', 'freio')
  AND p.is_active = TRUE
ORDER BY relevance DESC;

-- 1.5. Produtos com imagens
SELECT 
    p.id,
    p.name,
    p.price,
    pi.url AS image_url,
    pi.alt AS image_alt
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id AND pi."order" = 0
WHERE p.is_active = TRUE
ORDER BY p.name;

-- 1.6. Produtos com estoque baixo (< 10 unidades)
SELECT 
    p.id,
    p.sku,
    p.name,
    p.stock,
    c.name AS category_name
FROM products p
INNER JOIN categories c ON p.category_id = c.id
WHERE p.stock < 10 
  AND p.is_active = TRUE
ORDER BY p.stock ASC;

-- ============================================
-- 2. CONSULTAS DE VEÍCULOS E COMPATIBILIDADE
-- ============================================

-- 2.1. Listar montadoras com quantidade de veículos
SELECT 
    m.id,
    m.name,
    m.country,
    COUNT(v.id) AS total_vehicles
FROM manufacturers m
LEFT JOIN vehicles v ON m.id = v.manufacturer_id
GROUP BY m.id, m.name, m.country
ORDER BY m.name;

-- 2.2. Veículos por montadora com variantes
SELECT 
    m.name AS manufacturer,
    v.name AS vehicle,
    v.type,
    COUNT(vv.id) AS total_variants
FROM manufacturers m
INNER JOIN vehicles v ON m.id = v.manufacturer_id
LEFT JOIN vehicle_variants vv ON v.id = vv.vehicle_id
GROUP BY m.name, v.name, v.type
ORDER BY m.name, v.name;

-- 2.3. Buscar produtos compatíveis com um veículo específico
SELECT 
    p.id,
    p.name,
    p.price,
    p.stock,
    c.name AS category_name,
    v.name AS vehicle_name,
    vv.year,
    vv.model
FROM products p
INNER JOIN vehicle_compatibilities vc ON p.id = vc.product_id
INNER JOIN vehicles v ON vc.vehicle_id = v.id
LEFT JOIN vehicle_variants vv ON vc.variant_id = vv.id
INNER JOIN categories c ON p.category_id = c.id
WHERE v.slug = 'gol'  -- Altere para o veículo desejado
  AND p.is_active = TRUE
ORDER BY c.name, p.name;

-- 2.4. Produtos compatíveis com veículo E ano específico
SELECT 
    p.id,
    p.name,
    p.price,
    p.brand,
    vv.year,
    vv.model,
    vv.engine_type
FROM products p
INNER JOIN vehicle_compatibilities vc ON p.id = vc.product_id
INNER JOIN vehicle_variants vv ON vc.variant_id = vv.id
INNER JOIN vehicles v ON vc.vehicle_id = v.id
WHERE v.slug = 'gol' 
  AND vv.year = 2020
  AND p.is_active = TRUE
ORDER BY p.name;

-- 2.5. Veículos compatíveis com um produto
SELECT 
    v.name AS vehicle,
    m.name AS manufacturer,
    vv.year,
    vv.model,
    v.type
FROM vehicle_compatibilities vc
INNER JOIN vehicles v ON vc.vehicle_id = v.id
INNER JOIN manufacturers m ON v.manufacturer_id = m.id
LEFT JOIN vehicle_variants vv ON vc.variant_id = vv.id
WHERE vc.product_id = 'prd_pastilha_001'  -- Altere para o produto desejado
ORDER BY m.name, v.name, vv.year;

-- ============================================
-- 3. CONSULTAS DE PEDIDOS
-- ============================================

-- 3.1. Pedidos recentes com informações do cliente
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.total,
    o.created_at,
    u.name AS customer_name,
    u.email AS customer_email
FROM orders o
INNER JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC
LIMIT 20;

-- 3.2. Detalhes completos de um pedido
SELECT 
    o.order_number,
    o.status,
    o.created_at,
    u.name AS customer_name,
    u.email,
    u.phone,
    a.street || ', ' || a.number || ' - ' || a.neighborhood || ', ' || a.city || '/' || a.state AS full_address,
    oi.quantity,
    p.name AS product_name,
    oi.unit_price,
    oi.subtotal
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN addresses a ON o.address_id = a.id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.order_number = 'ORD-001'  -- Altere para o número do pedido
ORDER BY oi.created_at;

-- 3.3. Total de vendas por período
SELECT 
    DATE(o.created_at) AS date,
    COUNT(o.id) AS total_orders,
    SUM(o.total) AS total_revenue
FROM orders o
WHERE o.status NOT IN ('CANCELLED')
  AND o.created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(o.created_at)
ORDER BY date DESC;

-- 3.4. Produtos mais vendidos
SELECT 
    p.id,
    p.name,
    p.sku,
    SUM(oi.quantity) AS total_sold,
    SUM(oi.subtotal) AS total_revenue
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.status NOT IN ('CANCELLED')
GROUP BY p.id, p.name, p.sku
ORDER BY total_sold DESC
LIMIT 10;

-- 3.5. Pedidos por status
SELECT 
    o.status,
    COUNT(o.id) AS total_orders,
    SUM(o.total) AS total_value
FROM orders o
GROUP BY o.status
ORDER BY total_orders DESC;

-- ============================================
-- 4. CONSULTAS DE USUÁRIOS E CARRINHO
-- ============================================

-- 4.1. Carrinho de um usuário com detalhes dos produtos
SELECT 
    u.name AS customer_name,
    p.name AS product_name,
    p.price,
    ci.quantity,
    (p.price * ci.quantity) AS subtotal
FROM cart_items ci
INNER JOIN users u ON ci.user_id = u.id
INNER JOIN products p ON ci.product_id = p.id
WHERE u.email = 'cliente@email.com'  -- Altere para o email do usuário
ORDER BY ci.created_at;

-- 4.2. Total do carrinho por usuário
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(ci.id) AS total_items,
    SUM(p.price * ci.quantity) AS cart_total
FROM users u
LEFT JOIN cart_items ci ON u.id = ci.user_id
LEFT JOIN products p ON ci.product_id = p.id
GROUP BY u.id, u.name, u.email
HAVING COUNT(ci.id) > 0
ORDER BY cart_total DESC;

-- 4.3. Clientes com mais pedidos
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(o.id) AS total_orders,
    SUM(o.total) AS total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.status NOT IN ('CANCELLED')
GROUP BY u.id, u.name, u.email
ORDER BY total_orders DESC
LIMIT 10;

-- ============================================
-- 5. CONSULTAS DE ANÁLISE E RELATÓRIOS
-- ============================================

-- 5.1. Resumo geral do sistema
SELECT 
    (SELECT COUNT(*) FROM manufacturers) AS total_manufacturers,
    (SELECT COUNT(*) FROM vehicles) AS total_vehicles,
    (SELECT COUNT(*) FROM products WHERE is_active = TRUE) AS total_active_products,
    (SELECT COUNT(*) FROM users WHERE role = 'CUSTOMER') AS total_customers,
    (SELECT COUNT(*) FROM orders) AS total_orders,
    (SELECT SUM(total) FROM orders WHERE status NOT IN ('CANCELLED')) AS total_revenue;

-- 5.2. Produtos por categoria
SELECT 
    c.name AS category,
    COUNT(p.id) AS total_products,
    AVG(p.price) AS avg_price,
    SUM(p.stock) AS total_stock
FROM categories c
LEFT JOIN products p ON c.id = p.category_id AND p.is_active = TRUE
GROUP BY c.name
ORDER BY total_products DESC;

-- 5.3. Taxa de conversão (produtos no carrinho vs vendidos)
SELECT 
    p.id,
    p.name,
    COUNT(DISTINCT ci.user_id) AS users_with_in_cart,
    COUNT(DISTINCT oi.order_id) AS times_sold,
    CASE 
        WHEN COUNT(DISTINCT ci.user_id) > 0 
        THEN ROUND((COUNT(DISTINCT oi.order_id)::NUMERIC / COUNT(DISTINCT ci.user_id) * 100), 2)
        ELSE 0 
    END AS conversion_rate
FROM products p
LEFT JOIN cart_items ci ON p.id = ci.product_id
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE p.is_active = TRUE
GROUP BY p.id, p.name
HAVING COUNT(DISTINCT ci.user_id) > 0
ORDER BY conversion_rate DESC;

-- 5.4. Receita por categoria
SELECT 
    c.name AS category,
    COUNT(oi.id) AS items_sold,
    SUM(oi.subtotal) AS total_revenue
FROM categories c
INNER JOIN products p ON c.id = p.category_id
INNER JOIN order_items oi ON p.id = oi.product_id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.status NOT IN ('CANCELLED')
GROUP BY c.name
ORDER BY total_revenue DESC;

-- 5.5. Produtos sem vendas
SELECT 
    p.id,
    p.sku,
    p.name,
    p.price,
    p.stock,
    p.created_at
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.id IS NULL
  AND p.is_active = TRUE
ORDER BY p.created_at DESC;

-- ============================================
-- 6. CONSULTAS DE MANUTENÇÃO
-- ============================================

-- 6.1. Verificar integridade dos dados
SELECT 
    'Products without category' AS issue,
    COUNT(*) AS count
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE c.id IS NULL
UNION ALL
SELECT 
    'Vehicles without manufacturer' AS issue,
    COUNT(*) AS count
FROM vehicles v
LEFT JOIN manufacturers m ON v.manufacturer_id = m.id
WHERE m.id IS NULL
UNION ALL
SELECT 
    'Products without images' AS issue,
    COUNT(*) AS count
FROM products p
LEFT JOIN product_images pi ON p.id = pi.product_id
WHERE pi.id IS NULL AND p.is_active = TRUE;

-- 6.2. Produtos duplicados (mesmo nome)
SELECT 
    name,
    COUNT(*) AS duplicates
FROM products
GROUP BY name
HAVING COUNT(*) > 1;

-- 6.3. Limpar carrinhos antigos (mais de 30 dias)
-- CUIDADO: Esta query DELETA dados!
-- DELETE FROM cart_items 
-- WHERE created_at < CURRENT_DATE - INTERVAL '30 days';

-- 6.4. Atualizar estoque após venda (exemplo)
-- UPDATE products 
-- SET stock = stock - 1 
-- WHERE id = 'prd_pastilha_001' AND stock > 0;

-- ============================================
-- 7. VIEWS ÚTEIS (Opcional)
-- ============================================

-- 7.1. View de produtos com todas as informações
CREATE OR REPLACE VIEW vw_products_full AS
SELECT 
    p.id,
    p.sku,
    p.name,
    p.slug,
    p.description,
    p.price,
    p.compare_at_price,
    p.stock,
    p.is_active,
    p.is_featured,
    p.is_rare,
    p.brand,
    p.part_number,
    c.name AS category_name,
    c.slug AS category_slug,
    (SELECT url FROM product_images WHERE product_id = p.id ORDER BY "order" LIMIT 1) AS main_image,
    (SELECT COUNT(*) FROM vehicle_compatibilities WHERE product_id = p.id) AS compatible_vehicles_count
FROM products p
INNER JOIN categories c ON p.category_id = c.id;

-- 7.2. View de pedidos com resumo
CREATE OR REPLACE VIEW vw_orders_summary AS
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.total,
    o.created_at,
    u.name AS customer_name,
    u.email AS customer_email,
    COUNT(oi.id) AS total_items
FROM orders o
INNER JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.order_number, o.status, o.total, o.created_at, u.name, u.email;

-- ============================================
-- MENSAGEM FINAL
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ Consultas úteis carregadas!';
    RAISE NOTICE '📊 Total de consultas: 25+';
    RAISE NOTICE '📈 Views criadas: 2';
    RAISE NOTICE '';
    RAISE NOTICE '💡 Dica: Copie e cole as consultas conforme necessário';
END $$;
