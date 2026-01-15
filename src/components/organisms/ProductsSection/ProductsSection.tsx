'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../molecules/ProductCard/ProductCard';
import styles from './ProductsSection.module.css';

interface Product {
  id: string | number; // Aceita tanto string (do BigInt serializado) quanto number
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isFeatured: boolean;
  images: Array<{ url: string }>;
}

export const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔍 Buscando produtos em destaque...');
    
    fetch('/api/products/featured')
      .then(async (res) => {
        const data = await res.json();
        console.log('📦 Resposta da API:', data);
        
        if (!res.ok) {
          throw new Error(data.error || 'Erro ao buscar produtos');
        }
        
        if (data.success && data.data) {
          console.log(`✅ ${data.data.length} produtos encontrados`);
          setProducts(data.data);
        } else {
          console.warn('⚠️ API retornou sem produtos');
          setProducts([]);
        }
        
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('❌ Erro ao buscar produtos:', err);
        setError(err.message || 'Erro ao carregar produtos');
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Produtos em Destaque</h2>
        <p className={styles.subtitle}>Confira nossa seleção especial</p>
        
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Carregando produtos...</p>
          </div>
        )}
        
        {error && (
          <div className={styles.error}>
            <p>❌ {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Tentar Novamente
            </button>
          </div>
        )}
        
        {!isLoading && !error && products.length === 0 && (
          <div className={styles.empty}>
            <p>📦 Nenhum produto em destaque no momento.</p>
            <p className={styles.emptyHint}>
              Configure produtos como destaque no banco de dados.
            </p>
          </div>
        )}
        
        {!isLoading && !error && products.length > 0 && (
          <div className={styles.grid}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description || undefined}
                price={product.price}
                imageUrl={product.images[0]?.url}
                stock={product.stock}
                isFeatured={product.isFeatured}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
