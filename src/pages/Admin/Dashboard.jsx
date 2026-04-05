import React, { useState, useEffect } from 'react';
import { projectService } from '../../services/projectService';
import { messageService } from '../../services/messageService';
import { FolderKanban, MessageSquare, Star, Clock, Database, ChevronRight, Loader2 } from 'lucide-react';
import styles from './Admin.module.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projectsCount: 0,
    messagesCount: 0,
    unreadMessages: 0,
    featuredCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);

  const initialProjectsData = [
    {
      title: 'BQL Algo',
      description: 'Environnement interactif pour apprendre et exécuter des algorithmes avec un langage personnalisé.',
      full_description: 'BQL Algo est un projet ambitieux visant à démocratiser l\'apprentissage de l\'algorithmique. Il propose un environnement de développement complet dans le navigateur, capable d\'interpréter un langage dédié (le BQL) conçu pour être intuitif et pédagogique.',
      features: [
        'Éditeur de code avec coloration syntaxique personnalisée (Monaco-like)',
        'Interpréteur algorithmique complet (Lexer, Parser, AST)',
        'Exécution temps réel directement dans le navigateur',
        'Gestion avancée des erreurs (syntaxiques et sémantiques)',
        'Visualisation dynamique des tableaux et structures',
        'Support des boucles, conditions imbriquées et structures complexes',
        'Système de debugging et suivi d\'exécution',
        'Langage conçu spécifiquement pour l’apprentissage (BQL)'
      ],
      tags: ['React', 'Custom Language', 'Interpreter', 'Lexer/Parser', 'AST', 'Frontend Engine'],
      link: 'https://bql-algo.vercel.app',
      github: 'https://github.com/browql0/bql-algo',
      category: 'EdTech',
      featured: true,
      color: '#3b82f6',
      screenshots: []
    },
    {
      title: 'BQL Study',
      description: 'Plateforme SaaS éducative construite pour centraliser l’organisation académique, la gestion de contenu pédagogique, les quiz et les abonnements dans une architecture modulaire.',
      full_description: 'BQL Study est une plateforme EdTech conçue pour aider les étudiants à organiser leur apprentissage dans un environnement centralisé, moderne et évolutif. Le projet va bien au-delà d’une simple application de notes...',
      features: [
        'Gestion des matières via services dédiés et contexte global React',
        'Organisation des notes, fichiers et photos dans des modules séparés',
        'Système de quiz interactifs et logique d’auto-évaluation',
        'Gestion des abonnements, expiration et vouchers promotionnels',
        'Intégration des paiements et suivi des revenus'
      ],
      tags: ['React', 'Context API', 'Custom Hooks', 'Service Architecture', 'Supabase', 'Cloudflare', 'Payments', 'EdTech SaaS'],
      link: 'https://bql-study.vercel.app',
      github: 'https://github.com/browql0/bql-study',
      category: 'EdTech',
      featured: false,
      color: '#3b82f6',
      screenshots: []
    },
    {
      title: 'Budget App',
      description: 'Application de gestion financière personnelle avec suivi des dépenses, objectifs d’épargne et analytics avancées en temps réel.',
      full_description: 'Budget App est une application de gestion financière conçue pour offrir une vision claire et structurée des dépenses quotidiennes...',
      features: [
        'Dashboard financier avec indicateurs temps réel (budget, dépenses, économies)',
        'Système de gestion des dépenses avec catégorisation dynamique',
        'Gestion des dépenses récurrentes et automatisation du suivi'
      ],
      tags: ['React', 'Dashboard', 'Data Visualization', 'Finance Logic', 'State Management', 'UI/UX', 'Charts'],
      link: 'https://browql.netlify.app',
      github: 'https://github.com/browql0/browql_finance',
      category: 'Finance',
      featured: false,
      color: '#10b981',
      screenshots: []
    }
  ];

  const fetchStats = async () => {
    try {
      const [projects, messages] = await Promise.all([
        projectService.getAll(),
        messageService.getAll()
      ]);

      setStats({
        projectsCount: projects.length,
        messagesCount: messages.length,
        unreadMessages: messages.filter(m => !m.is_read).length,
        featuredCount: projects.filter(p => p.featured).length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleMigration = async () => {
    if (!window.confirm('Voulez-vous importer les projets par défaut dans Supabase ?')) return;
    
    setMigrating(true);
    try {
      for (const project of initialProjectsData) {
        await projectService.create(project);
      }
      alert('Migration terminée avec succès !');
      fetchStats();
    } catch (error) {
      console.error('Migration error:', error);
      alert('Erreur pendant la migration.');
    } finally {
      setMigrating(false);
    }
  };

  const statCards = [
    { label: 'Projets Publiés', value: stats.projectsCount, icon: <FolderKanban />, color: '#3b82f6', trend: '+2 ce mois' },
    { label: 'Messages Clients', value: stats.messagesCount, icon: <MessageSquare />, color: '#10b981', trend: 'Nouveaux' },
    { label: 'À Traiter', value: stats.unreadMessages, icon: <Clock />, color: '#f59e0b', trend: 'Urgent' },
    { label: 'Mises en avant', value: stats.featuredCount, icon: <Star />, color: '#ef4444', trend: 'Sélection' },
  ];

  if (loading) return <div className={styles.loading}>Préparation de vos données...</div>;

  return (
    <div className={styles.dashboard}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Vue d'ensemble</h1>
          <p className={styles.subtitle}>Statistiques et gestion de votre activité</p>
        </div>
      </header>

      <div className={styles.grid}>
        {statCards.map((card, index) => (
          <div key={index} className={`${styles.card} ${styles.statCard}`}>
            <div className={styles.statIcon} style={{ color: card.color }}>
              {card.icon}
            </div>
            <div className={styles.statContent}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--admin-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {card.label}
                </span>
                <span style={{ fontSize: '0.7rem', color: card.color, padding: '2px 8px', borderRadius: '4px', background: `${card.color}11`, border: `1px solid ${card.color}22` }}>
                  {card.trend}
                </span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '0.5rem', letterSpacing: '-1px' }}>
                {card.value}
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${card.color}55, transparent)` }}></div>
          </div>
        ))}
      </div>

      {stats.projectsCount === 0 && !loading && (
        <div className={styles.card} style={{ marginTop: '2rem', border: '1px dashed var(--admin-accent)', background: 'rgba(59, 130, 246, 0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '50%', 
              backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--admin-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Database size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '0.25rem' }}>Initialiser les données</h3>
              <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem' }}>
                Votre base de données est vide. Souhaitez-vous importer vos 3 projets par défaut ?
              </p>
            </div>
            <button 
              onClick={handleMigration} 
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={migrating}
            >
              {migrating ? (
                <>
                  <Loader2 size={18} className={styles.spin} />
                  Migration...
                </>
              ) : (
                <>
                  Lancer la migration
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
