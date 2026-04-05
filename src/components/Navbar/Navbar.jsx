import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Gérer le changement de style au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Empêcher le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'À propos', href: '#about' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.navbar}>
        {/* LOGO */}
        <a href="#hero" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoText}>Bql</span>
          <span className={styles.logoDot}>.</span>
        </a>
        
        {/* DESKTOP LINKS (CENTERED) */}
        <ul className={styles.navLinks}>
          {navLinks.map((link, index) => (
            <li key={index} className={styles.navItem}>
              <a href={link.href} className={styles.navLink}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* RIGHT ACTIONS (CTA & HAMBURGER) */}
        <div className={styles.navActions}>
          <a href="#contact" className={styles.ctaButton}>
            Me contacter
            <span className={styles.ctaIcon}>&rarr;</span>
          </a>

          {/* MOBILE HAMBURGER ICON */}
          <button 
            className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} 
            onClick={toggleMenu} 
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link, index) => (
              <li 
                key={index} 
                className={styles.mobileNavItem} 
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <a href={link.href} className={styles.mobileNavLink} onClick={closeMenu}>
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.mobileFooter} style={{ animationDelay: '0.6s' }}>
            <a href="#contact" className={styles.ctaButtonMobile} onClick={closeMenu}>
              Démarrer un projet
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
