'use client';
import React, { useState } from 'react';
import styles from './AboutSection.module.css';

export const AboutSection: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Por Que Escolher a Automotors?</h2>
        <p className={styles.subtitle}>
          Somos especialistas em peças automotivas com anos de experiência.
        </p>
        <div className={styles.grid}>
          {/* Card 1: Qualidade Garantida */}
          <div 
            className={styles.card}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={styles.iconWrapper}>
              <div className={`${styles.icon} ${hoveredCard === 1 ? styles.iconShield : ''}`}>
                🛡️
              </div>
              {hoveredCard === 1 && (
                <div className={styles.shieldGlow}></div>
              )}
            </div>
            <h3>Qualidade Garantida</h3>
            <p>Peças testadas e certificadas</p>
          </div>

          {/* Card 2: Entrega Rápida */}
          <div 
            className={styles.card}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={styles.iconWrapper}>
              <div className={styles.deliveryScene}>
                {/* Pessoa aguardando (ESQUERDA) */}
                <div className={`${styles.person} ${hoveredCard === 2 ? styles.personReceiving : ''}`}>
                  🧍
                </div>
                
                {/* Caixa caindo no caminhão (DIREITA) - Só aparece no hover */}
                {hoveredCard === 2 && (
                  <div className={`${styles.package} ${styles.packageFalling}`}>
                    📦
                  </div>
                )}
                
                {/* Caminhão com fumaça (DIREITA) */}
                <div className={`${styles.truckContainer} ${hoveredCard === 2 ? styles.truckMoving : ''}`}>
                  <div className={styles.truck}>
                    🚚
                  </div>
                  {hoveredCard === 2 && (
                    <>
                      <div className={styles.smoke1}>💨</div>
                      <div className={styles.smoke2}>💨</div>
                      <div className={styles.smoke3}>💨</div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <h3>Entrega Rápida</h3>
            <p className={hoveredCard === 2 ? styles.textHighlight : ''}>
              {hoveredCard === 2 ? 'Receba em até 3h' : 'Receba em até 3h'}
            </p>
          </div>

          {/* Card 3: Atendimento Especializado */}
          <div 
            className={styles.card}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={styles.iconWrapper}>
              <div className={styles.supportScene}>
                <div className={`${styles.agent} ${hoveredCard === 3 ? styles.agentTalking : ''}`}>
                  👨‍💼
                </div>
                <div className={`${styles.speechBubble} ${hoveredCard === 3 ? styles.bubbleActive : ''}`}>
                  💬
                </div>
                <div className={`${styles.customer} ${hoveredCard === 3 ? styles.customerHappy : ''}`}>
                  😊
                </div>
              </div>
            </div>
            <h3>Atendimento Especializado</h3>
            <p>Equipe pronta para ajudar</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
