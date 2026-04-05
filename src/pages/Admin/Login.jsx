import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, AlertCircle, Fingerprint } from 'lucide-react';
import { authService } from '../../services/authService';
import styles from './Admin.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.login(email, password);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError('Identifiants invalides ou erreur de connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={`${styles.card} ${styles.glassCard}`} style={{ width: '100%', maxWidth: '420px', padding: '2.5rem' }}>
        <div className={styles.loginHeader}>
          <div className={styles.loginIconBox}>
            <Fingerprint size={32} />
          </div>
          <h1 className={styles.title} style={{ fontSize: '1.75rem', letterSpacing: '1px' }}>ACCÈS PRIVÉ</h1>
          <p className={styles.subtitle}>Espace d'administration du portfolio</p>
        </div>

        {error && (
          <div className={`${styles.badge} ${styles.badgeDanger}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '1rem', borderRadius: '12px' }}>
            <AlertCircle size={20} />
            <span style={{ fontSize: '0.9rem' }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Adresse Email</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input 
                type="email" 
                className={`${styles.input} ${styles.inputWithIcon}`} 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.io" 
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mot de passe</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input 
                type="password" 
                className={`${styles.input} ${styles.inputWithIcon}`} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                required
              />
            </div>
          </div>

          <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`} style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? <Loader2 className={styles.spin} size={20} /> : 'Authentification'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <a href="/" style={{ color: 'var(--admin-text-secondary)', textDecoration: 'none', fontSize: '0.85rem', opacity: 0.7, transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = 1} onMouseLeave={e => e.target.style.opacity = 0.7}>
            Retour au site public
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
