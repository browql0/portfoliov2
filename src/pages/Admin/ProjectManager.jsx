import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, ExternalLink, Star, Search, Filter, MoreVertical, FolderKanban } from 'lucide-react';
import { projectService } from '../../services/projectService';
import styles from './Admin.module.css';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProjects = async () => {
    try {
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le projet "${title}" ? Cette action est irréversible.`)) {
      try {
        await projectService.delete(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        alert('Erreur lors de la suppression.');
      }
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={styles.loading}>Chargement de vos réalisations...</div>;

  return (
    <div className={styles.projectManager}>
      <header className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Mes Projets</h1>
          <p className={styles.subtitle}>Vous avez actuellement {projects.length} projets en ligne</p>
        </div>
        <Link to="/admin/projects/new" className={`${styles.btn} ${styles.btnPrimary}`}>
          <Plus size={20} />
          Nouveau Projet
        </Link>
      </header>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Rechercher un projet..." 
            className={styles.input} 
            style={{ paddingLeft: '3rem' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={`${styles.btn} ${styles.btnSecondary}`}>
          <Filter size={18} />
          Filtrer
        </button>
      </div>

      <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Détails du Projet</th>
                <th>Ordre</th>
                <th>Catégorie</th>
                <th>Visibilité</th>
                <th>Dernière MAJ</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '4rem' }}>
                    <div style={{ opacity: 0.3, marginBottom: '1rem' }}><FolderKanban size={48} style={{ margin: '0 auto' }} /></div>
                    <p style={{ color: 'var(--admin-text-secondary)' }}>Aucun projet trouvé</p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div 
                          className={styles.projectThumb}
                          style={{ 
                            width: '48px', 
                            height: '48px', 
                            backgroundColor: `${project.color}22`,
                            border: `1px solid ${project.color}44`,
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: project.color,
                            fontWeight: '800'
                          }}
                        >
                          {project.title.substring(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <div style={{ fontWeight: '700', fontSize: '1rem' }}>{project.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {project.github && <><ExternalLink size={10} /> GitHub</>}
                            {project.featured && <><Star size={10} fill="#f59e0b" color="#f59e0b" /> Featured</>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.badgeNeutral}>{project.order_index}</span>
                    </td>
                    <td>{project.category}</td>
                    <td>
                      <span className={project.featured ? styles.badgeSuccess : styles.badgeNeutral}>
                        {project.featured ? 'Public / Featured' : 'Public'}
                      </span>
                    </td>
                    <td style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem' }}>
                      {new Date(project.updated_at || project.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <Link 
                          to={`/admin/projects/edit/${project.id}`} 
                          className={`${styles.btn} ${styles.btnSecondary}`} 
                          style={{ padding: '0.5rem' }} 
                          title="Modifier"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button 
                          onClick={() => handleDelete(project.id, project.title)} 
                          className={`${styles.btn} ${styles.btnDanger}`}
                          style={{ padding: '0.5rem' }}
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
