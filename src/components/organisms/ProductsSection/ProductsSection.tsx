'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../molecules/ProductCard/ProductCard';
import styles from './ProductsSection.module.css';

interface Product {
  id: number;
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

  useEffect(() => {
    fetch('/api/products/featured')
      .then(res => res.json())
      .then(data => {
        setProducts(data.data || []);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  return (
    <section id="products" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Produtos em Destaque</h2>
        <p className={styles.subtitle}>Confira nossa seleção especial</p>
        
        {isLoading && <div className={styles.loading}>Carregando...</div>}
        
        {!isLoading && products.length > 0 && (
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
