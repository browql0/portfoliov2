import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.aboutSection}>
      {/* Texture d'arrière-plan */}
      <div className={styles.bgGrid}></div>
      <div className={styles.glowBlob}></div>

      <div className={styles.container}>
        {/* Entête de section stylisé */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// 01. À propos</span>
          <h2 className={styles.title}>
            Design. Code. <span className={styles.textGlow}>Magie.</span>
          </h2>
        </div>

        <div className={styles.contentGrid}>
          
          {/* Bloc Biographie - Style fenêtre macOS */}
          <div className={`${styles.card} ${styles.bioCard}`}>
             <div className={styles.cardHeader}>
               <div className={styles.dots}>
                 <span></span><span></span><span></span>
               </div>
             </div>
             <p className={styles.bioIntro}>
              Hey ! Je suis un développeur full stack passionné par la création d’expériences web modernes, performantes et bien pensées.
             </p>
             <div className={styles.bioText}>
               <p>Je conçois des interfaces propres et intuitives, mais aussi des systèmes solides derrière, capables de gérer de vrais besoins. Mon approche combine design, logique et optimisation pour créer des produits fiables et agréables à utiliser.</p>
               <p>Actuellement, je développe mes propres projets, dont une plateforme dédiée à l’apprentissage de l’algorithmique, avec un langage personnalisé et un environnement interactif.</p>
               <p>Mon objectif est de construire des applications utiles, scalables et qui offrent une vraie expérience utilisateur.</p>
             </div>
             <div className={styles.signature}>— Browql</div>
          </div>

          {/* Bloc Visuel Abstrait (Animation CSS "Blob") */}
          <div className={`${styles.card} ${styles.visualCard}`}>
            <div className={styles.visualWrapper}>
               {/* Formes en mouvement */}
               <div className={styles.abstractShape1}></div>
               <div className={styles.abstractShape2}></div>
               <div className={styles.glassOverlay}>
                  <span>CREATIVE DEVELOPER</span>
               </div>
            </div>
          </div>

        {/* Bloc Expérience (Timeline) */}
<div className={`${styles.card} ${styles.expCard}`}>
   <h3 className={styles.cardTitle}>Mon Parcours</h3>
   <div className={styles.timeline}>

      <div className={styles.timelineItem}>
         <div className={styles.timeDot}></div>
         <div className={styles.timeContent}>
            <span className={styles.timeYear}>2022 - Présent</span>
            <strong className={styles.timeTitle}>Développeur Full Stack</strong>
            <p className={styles.timeDesc}>
               Création d’applications web modernes avec React, Node.js et bases de données. 
               Développement de projets complets avec une attention particulière à la performance, 
               à l’architecture et à l’expérience utilisateur.
            </p>
         </div>
      </div>

      <div className={styles.timelineItem}>
         <div className={styles.timeDot}></div>
         <div className={styles.timeContent}>
            <span className={styles.timeYear}>2018 - 2021</span>
            <strong className={styles.timeTitle}>Développement Web Front-End</strong>
            <p className={styles.timeDesc}>
               Conception de sites web en HTML, CSS et JavaScript avec un focus sur 
               la structure, le design et l’optimisation des interfaces utilisateur.
            </p>
         </div>
      </div>

      <div className={styles.timelineItem}>
         <div className={styles.timeDot}></div>
         <div className={styles.timeContent}>
            <span className={styles.timeYear}>2017 - 2018</span>
            <strong className={styles.timeTitle}>Bots Discord & Automatisation</strong>
            <p className={styles.timeDesc}>
               Développement de bots Discord avec gestion de commandes, événements 
               et systèmes automatisés interactifs.
            </p>
         </div>
      </div>

   </div>
</div>

        {/* Bloc Compétences Techniques (Progress Bars) */}
<div className={`${styles.card} ${styles.skillsCard}`}>
   <h3 className={styles.cardTitle}>Expertise Technique</h3>

   <div className={styles.skillBars}>
      {[
        { name: 'HTML / CSS ', level: '90%' },
         { name: 'UI Design ', level: '90%' },
        { name: 'JavaScript (ES6+)', level: '85%' },
        { name: 'React & Frontend Moderne', level: '80%' },
        { name: 'Backend (Node.js / Express)', level: '70%' },
        { name: 'Logique & Algorithmique', level: '85%' }
      ].map((skill, idx) => (
        <div className={styles.skillRow} key={idx}>
          
          <div className={styles.skillInfo}>
            <span className={styles.skillName}>{skill.name}</span>
            <span className={styles.skillPct}>{skill.level}</span>
          </div>

          <div className={styles.barTrack}>
            <div 
              className={styles.barFill} 
              style={{ width: skill.level }}
            >
              <div className={styles.barGlow}></div>
            </div>
          </div>

        </div>
      ))}
   </div>
</div>
          {/* Bloc Statistiques - 3 Bento Boxes */}
          <div className={styles.statsContainer}>
             <div className={`${styles.card} ${styles.statBox}`}>
                <div className={styles.statGlow}>7+</div>
                <div className={styles.statLabel}>Années</div>
             </div>
             <div className={`${styles.card} ${styles.statBox}`}>
                <div className={styles.statGlow}>30+</div>
                <div className={styles.statLabel}>Projets</div>
             </div>
             <div className={`${styles.card} ${styles.statBox}`}>
                <div className={styles.statGlow}>100%</div>
                <div className={styles.statLabel}>Satisfaction</div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
