import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      {/* Background éléments décoratifs (Glowing Orbs) */}
      <div className={styles.glowOrb1}></div>
      <div className={styles.glowOrb2}></div>

      <div className={styles.content}>
        
        {/* Badge Disponibilité */}
        <div className={styles.badge} aria-label="Statut">
          <span className={styles.pulse}></span>
          Disponible pour de nouveaux défis
        </div>

        {/* Titre Impactant */}
        <h1 className={styles.title}>
          Transformer des idées en <br className={styles.break}/>
          <span className={styles.highlight}>Expériences Digitales</span>
        </h1>

        {/* Sous-titre */}
        <p className={styles.subtitle}>
          Je suis un développeur front-end spécialisé dans la création d'interfaces utilisateur modernes, réactives et hautement optimisées. J'allie un design minimaliste avec un code robuste en React.
        </p>

        {/* Boutons d'action */}
        <div className={styles.actions}>
          <a href="#projects" className={`btn-primary ${styles.primaryBtn}`}>
            Découvrir mon travail <span className={styles.arrow}>&rarr;</span>
          </a>
          <a href="#contact" className={`btn-secondary ${styles.secondaryBtn}`}>
            Discutons!
          </a>
        </div>

        {/* Technologies de prédilection */}
        <div className={styles.techStack}>
          <span className={styles.techLabel}>Technologies de prédilection :</span>
          <div className={styles.techIcons}>
            <span className={styles.techItem}>React</span>
            <span className={styles.techItem}>JavaScript (ES6+)</span>
            <span className={styles.techItem}>CSS3/UI</span>
            <span className={styles.techItem}>Node.js</span>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
