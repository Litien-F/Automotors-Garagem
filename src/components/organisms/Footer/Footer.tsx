import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h3>Automotors Garagem</h3>
            <p>Sua loja de peças automotivas de qualidade.</p>
          </div>
          <div>
            <h3>Contato</h3>
            <p>📞 (85) 98791-9027</p>
            <p>📧 litien.dev@hotmail.com.br</p>
            <p>📍 Fortaleza, CE</p>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© 2026 Automotors Garagem. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
