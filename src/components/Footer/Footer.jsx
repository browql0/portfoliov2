import { Link } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footerSection}>
      {/* Texture d'arrière-plan cohérente */}
      <div className={styles.bgGrid}></div>
      <div className={styles.footerGlow}></div>

      <div className={styles.container}>
        <div className={styles.bentoGrid}>
          
          {/* 1. Carte Marque (Main) */}
          <div className={`${styles.card} ${styles.brandCard}`}>
            <div className={styles.logo} onClick={scrollToTop}>
              BQL<span className={styles.dot}>.</span>
            </div>
            <p className={styles.description}>
              Concevoir des interfaces mémorables et des architectures scalables. 
              Basé à Tanger, Maroc. Propageant le design futuriste à travers le code.
            </p>
            <div className={styles.statusBox}>
              <span className={styles.statusDot}></span>
              ALIVE & CODING
            </div>
          </div>

          {/* 2. Carte Navigation (Vertical Menu) */}
          <div className={`${styles.card} ${styles.navCard}`}>
             <h4 className={styles.cardHeader}>MENU</h4>
             <nav className={styles.footerNav}>
                <a href="#about" className={styles.navLink}>
                   <span className={styles.navNum}>01.</span> À Propos
                </a>
                <a href="#projects" className={styles.navLink}>
                   <span className={styles.navNum}>02.</span> Projets
                </a>
                <a href="#contact" className={styles.navLink}>
                   <span className={styles.navNum}>03.</span> Contact
                </a>
             </nav>
          </div>

          {/* 3. Carte Réseaux (Social Badge Grid) */}
          <div className={`${styles.card} ${styles.socialCard}`}>
            <h4 className={styles.cardHeader}>CONNECT</h4>
            <div className={styles.socialGrid}>
               <a href="https://github.com/browql0" target="_blank" rel="noopener noreferrer" className={styles.socialBadge}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialBadge}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialBadge}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialBadge}>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
               </a>
            </div>
          </div>

          {/* 4. Carte "Back-to-top/Meta" (Tall) */}
          <div className={`${styles.card} ${styles.metaCard}`} onClick={scrollToTop}>
            <div className={styles.scrollArrow}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </div>
            <p className={styles.metaLabel}>RETOUR EN HAUT</p>
          </div>

        </div>

        {/* Barre de crédits finale */}
        <div className={styles.creditsRow}>
          <div className={styles.copyright}>
            © {currentYear} Browql. Tous droits réservés.
          </div>
          <div className={styles.builtBy}>
            Conçu par browql à Tanger, Maroc
            <Link to="/admin" className={styles.adminIconLink} aria-label="Admin">
              <Fingerprint size={12} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
