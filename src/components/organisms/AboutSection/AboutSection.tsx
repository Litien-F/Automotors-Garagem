import React from 'react';
import styles from './AboutSection.module.css';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Por Que Escolher a Automotors?</h2>
        <p className={styles.subtitle}>
          Somos especialistas em peças automotivas com anos de experiência.
        </p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.icon}>🛡️</div>
            <h3>Qualidade Garantida</h3>
            <p>Peças testadas e certificadas</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>🚚</div>
            <h3>Entrega Rápida</h3>
            <p>Receba em até 24h</p>
          </div>
          <div className={styles.card}>
            <div className={styles.icon}>👤</div>
            <h3>Atendimento Especializado</h3>
            <p>Equipe pronta para ajudar</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
