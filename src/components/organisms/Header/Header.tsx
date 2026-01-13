'use client';
import React, { useState, useEffect } from 'react';
import Button from '../../atoms/Button/Button';
import styles from './Header.module.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => scrollTo('hero')}>
          🚗 Automotors Garagem
        </div>
        <nav className={styles.nav}>
          <button onClick={() => scrollTo('hero')}>Início</button>
          <button onClick={() => scrollTo('products')}>Produtos</button>
          <button onClick={() => scrollTo('about')}>Sobre</button>
          <button onClick={() => scrollTo('contact')}>Contato</button>
        </nav>
        <Button variant="primary" size="sm" onClick={() => scrollTo('contact')}>
          Fale Conosco
        </Button>
      </div>
    </header>
  );
};

export default Header;
