import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, MessageSquare, LogOut, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import { authService } from '../../services/authService';
import styles from './Admin.module.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      try {
        await authService.logout();
        navigate('/admin/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
  };

  const navItems = [
    { path: '/admin', icon: <LayoutDashboard size={22} />, label: 'Tableau de bord', end: true },
    { path: '/admin/projects', icon: <FolderKanban size={22} />, label: 'Gestion Projets' },
    { path: '/admin/messages', icon: <MessageSquare size={22} />, label: 'Messagerie' },
  ];

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logoBox}>B</div>
          <span>ADMIN AREA</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => 
                `${styles.navLink} ${isActive ? styles.activeNavLink : ''}`
              }
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              <span>{item.label}</span>
              {location.pathname === item.path && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
            </NavLink>
          ))}
          
          <div style={{ margin: '1.5rem 1rem 0.5rem', fontSize: '0.7rem', fontWeight: '700', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Liens Externes
          </div>
          
          <a href="/" target="_blank" rel="noopener noreferrer" className={styles.navLink}>
            <ExternalLink size={20} />
            <span>Voir le site</span>
          </a>
        </nav>

        <div className={styles.logoutBtn}>
          <button onClick={handleLogout} className={`${styles.btn} ${styles.btnDanger}`} style={{ width: '100%', justifyContent: 'center' }}>
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          {/* Could add a search or breadcrumbs here if needed */}
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
