import React, { useState } from 'react';
import { messageService } from '../../services/messageService';
import styles from './Contact.module.css';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      await messageService.send(formState);
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Contact error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className={styles.contactSection}>
      {/* Texture d'arrière-plan cohérente */}
      <div className={styles.bgGrid}></div>
      <div className={styles.glowBlob}></div>

      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// 03. Contact</span>
          <h2 className={styles.title}>
            Parlons de votre <span className={styles.textGlow}>Projet.</span>
          </h2>
        </div>

        <div className={styles.contentGrid}>
          {/* Carte Formulaire - Style Mac Window */}
          <div className={`${styles.card} ${styles.formCard}`}>
            <div className={styles.cardHeader}>
              <div className={styles.dots}>
                <span></span><span></span><span></span>
              </div>
              <span className={styles.headerTitle}>new_message.js</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Nom complet</label>
                <input 
                  type="text" 
                  className={styles.input} 
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Email professionnel</label>
                <input 
                  type="email" 
                  className={styles.input} 
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  required 
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Message</label>
                <textarea 
                  className={styles.textarea} 
                  placeholder="Dites-moi tout sur votre projet..."
                  rows="4"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`${styles.submitBtn} ${status === 'success' ? styles.success : ''}`}
                disabled={status === 'sending'}
              >
                {status === 'idle' && (
                  <>
                    Envoyer le message
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </>
                )}
                {status === 'sending' && "Envoi en cours..."}
                {status === 'success' && "Message envoyé ! ✨"}
              </button>
            </form>
          </div>

          {/* Cartes d'informations latérales */}
          <div className={styles.sideColumn}>
            
            {/* Carte Disponibilité */}
            <div className={`${styles.card} ${styles.statusCard}`}>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot}></span>
                Disponible pour de nouveaux projets
              </div>
              <h3 className={styles.sideTitle}>On commence quand ?</h3>
              <p className={styles.sideText}>
                Je réponds généralement en moins de 24 heures.
              </p>
            </div>

            {/* Carte Réseaux Sociaux */}
            <div className={`${styles.card} ${styles.socialCard}`}>
              <h3 className={styles.sideTitle}>Retrouvez-moi</h3>
              <div className={styles.socialLinks}>
                <a href="https://github.com/browql0" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  GitHub
                </a>
                <a href="#" className={styles.socialLink}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  LinkedIn
                </a>
                <a href="mailto:contact@browql.io" className={styles.socialLink}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  Email
                </a>
              </div>
            </div>

            {/* Carte Localisation */}
            <div className={`${styles.card} ${styles.locationCard}`}>
              <div className={styles.locationInfo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>Basé à Tanger, Maroc</span>
              </div>
              <div className={styles.timeInfo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <span>UTC+1 (Morocco Time)</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
