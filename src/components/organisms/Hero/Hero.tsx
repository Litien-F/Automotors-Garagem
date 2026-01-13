'use client';
import React from 'react';
import Button from '../../atoms/Button/Button';
import styles from './Hero.module.css';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Peças Automotivas de <span className={styles.highlight}>Qualidade Premium</span>
        </h1>
        <p className={styles.subtitle}>
          Encontre as melhores peças para seu veículo. Do clássico ao moderno.
        </p>
        <div className={styles.actions}>
          <Button variant="primary" size="lg" onClick={() => scrollTo('products')}>
            Ver Produtos
          </Button>
          <Button variant="outline" size="lg" onClick={() => scrollTo('contact')}>
            Fale Conosco
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
