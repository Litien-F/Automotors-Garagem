import React from 'react';
import Card from '../../atoms/Card/Card';
import Button from '../../atoms/Button/Button';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  id: number | string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  isFeatured?: boolean;
  onViewDetails?: (id: number | string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  stock,
  isFeatured,
  onViewDetails,
}) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card variant="elevated" padding="none" hoverable className={styles.card}>
      {isFeatured && (
        <div className={styles.badge}>Destaque</div>
      )}
      
      <div className={styles.image}>
        {imageUrl ? (
          <img src={imageUrl} alt={name} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>📦</div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        {description && <p className={styles.description}>{description}</p>}
        
        <div className={styles.footer}>
          <div>
            <span className={styles.price}>{formatPrice(price)}</span>
            <span className={styles.stock}>{stock > 0 ? `${stock} em estoque` : 'Indisponível'}</span>
          </div>
          <Button variant="primary" size="sm" onClick={() => onViewDetails?.(id)} disabled={stock === 0}>
            Ver Detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
