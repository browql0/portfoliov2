import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Save, X, Image as ImageIcon, Plus, Trash2, ArrowLeft, Loader2, Sparkles, Layout, Code, Info } from 'lucide-react';
import { projectService } from '../../services/projectService';
import styles from './Admin.module.css';

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_description: '',
    category: '',
    link: '',
    github: '',
    color: '#3b82f6',
    featured: false,
    order_index: 0,
    tags: [],
    features: [],
    screenshots: []
  });

  const [newTag, setNewTag] = useState('');
  const [newFeature, setNewFeature] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchProject = async () => {
        try {
          const project = await projectService.getById(id);
          setFormData(project);
        } catch (error) {
          console.error('Error fetching project:', error);
          alert('Erreur lors du chargement du projet.');
        } finally {
          setFetching(false);
        }
      };
      fetchProject();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (featureToRemove) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter(f => f !== featureToRemove) }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await projectService.uploadImage(file);
      setFormData(prev => ({ ...prev, screenshots: [...prev.screenshots, url] }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Erreur lors de l\'upload de l\'image.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await projectService.update(id, formData);
      } else {
        await projectService.create(formData);
      }
      navigate('/admin/projects');
    } catch (error) {
      console.error('Save error:', error);
      alert('Erreur lors de l\'enregistrement.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className={styles.loading}>Initialisation de l'éditeur...</div>;

  return (
    <div className={styles.projectForm}>
      <header className={styles.pageHeader}>
        <div>
          <Link to="/admin/projects" className={styles.btnSecondary} style={{ display: 'inline-flex', marginBottom: '1rem', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
            <ArrowLeft size={16} /> Retour
          </Link>
          <h1 className={styles.title}>{isEdit ? 'Éditer le Projet' : 'Nouveau Projet'}</h1>
          <p className={styles.subtitle}>Configurez les détails et l'apparence de votre réalisation</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="button" onClick={() => navigate('/admin/projects')} className={styles.btnSecondary}>
            <X size={18} /> Annuler
          </button>
          <button type="submit" form="project-form" className={`${styles.btn} ${styles.btnPrimary}`} disabled={loading}>
            {loading ? <Loader2 size={18} className={styles.spin} /> : <Save size={18} />}
            {isEdit ? 'Mettre à jour' : 'Publier le Projet'}
          </button>
        </div>
      </header>

      <form id="project-form" onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Left Side: General Info */}
        <div className={styles.formSection}>
          <div className={`${styles.card} ${styles.glassCard}`} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--admin-accent)' }}>
              <Info size={20} />
              <h3 style={{ margin: 0 }}>Informations Générales</h3>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Titre du Projet</label>
              <input 
                type="text" name="title" className={styles.input} 
                value={formData.title} onChange={handleChange} required 
                placeholder="Ex: My Awesome Portfolio"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Catégorie</label>
                <input 
                  type="text" name="category" className={styles.input} 
                  value={formData.category} onChange={handleChange} required 
                  placeholder="Ex: SaaS, Mobile, Web"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Couleur d'accent</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="color" name="color" className={styles.input} 
                    style={{ width: '50px', padding: '2px', height: '40px' }}
                    value={formData.color} onChange={handleChange}
                  />
                  <input 
                    type="text" name="color" className={styles.input} 
                    value={formData.color} onChange={handleChange}
                    placeholder="#ffffff"
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                Description Courte
                <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>Résumé pour la grille de projets</span>
              </label>
              <textarea 
                name="description" className={styles.textarea} rows="2"
                value={formData.description} onChange={handleChange} required
                placeholder="Décrivez votre projet en une phrase accrocheuse..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description Complète</label>
              <textarea 
                name="full_description" className={styles.textarea} rows="5"
                value={formData.full_description} onChange={handleChange}
                placeholder="Détails approfondis sur le projet, les défis et les solutions..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                <label className={styles.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input 
                    type="checkbox" name="featured" 
                    checked={formData.featured} onChange={handleChange}
                  />
                  Mettre ce projet en avant (Featured)
                </label>
              </div>
              <div className={styles.formGroup} style={{ marginBottom: 0 }}>
                <label className={styles.label}>Ordre d'affichage</label>
                <input 
                  type="number" name="order_index" className={styles.input} 
                  value={formData.order_index} onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.glassCard}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--admin-accent)' }}>
              <Layout size={20} />
              <h3 style={{ margin: 0 }}>Médias & Liens</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Lien du site (Live)</label>
                <input 
                  type="url" name="link" className={styles.input} 
                  value={formData.link} onChange={handleChange}
                  placeholder="https://..."
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Lien GitHub</label>
                <input 
                  type="url" name="github" className={styles.input} 
                  value={formData.github} onChange={handleChange}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Captures d'écran</label>
              <div className={styles.uploadArea}>
                <input 
                  type="file" id="screenshots" className={styles.fileInput} 
                  onChange={handleFileUpload} accept="image/*"
                  disabled={uploading}
                />
                <label htmlFor="screenshots" className={styles.uploadLabel}>
                  {uploading ? (
                    <Loader2 size={32} className={styles.spin} />
                  ) : (
                    <ImageIcon size={32} />
                  )}
                  <span>{uploading ? 'Envoi en cours...' : 'Cliquez pour uploader une image'}</span>
                </label>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '1rem' }}>
                {formData.screenshots.map((url, index) => (
                  <div key={index} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', aspectRatio: '16/9' }}>
                    <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button 
                      type="button" 
                      onClick={() => handleRemoveImage(index)}
                      style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(239, 68, 68, 0.9)', color: 'white', border: 'none', borderRadius: '4px', padding: '2px', cursor: 'pointer' }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Tags & Features */}
        <div className={styles.formSection}>
          <div className={`${styles.card} ${styles.glassCard}`} style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--admin-accent)' }}>
              <Code size={20} />
              <h3 style={{ margin: 0 }}>Stack Technique</h3>
            </div>
            
            <div className={styles.formGroup}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" className={styles.input} 
                  value={newTag} onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Ex: React, Node.js..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag(e)}
                />
                <button type="button" onClick={handleAddTag} className={styles.btnSecondary}>
                  <Plus size={20} />
                </button>
              </div>
              <div className={styles.tagCloud}>
                {formData.tags.map((tag, index) => (
                  <span key={index} className={`${styles.tagItem} ${styles.tagItemBlue}`}>
                    {tag}
                    <X size={14} onClick={() => handleRemoveTag(tag)} style={{ cursor: 'pointer' }} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.glassCard}`}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--admin-accent)' }}>
              <Sparkles size={20} />
              <h3 style={{ margin: 0 }}>Fonctionnalités Clés</h3>
            </div>

            <div className={styles.formGroup}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
                <input 
                  type="text" className={styles.input} 
                  value={newFeature} onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Décrivez une fonctionnalité majeure..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFeature(e)}
                />
                <button type="button" onClick={handleAddFeature} className={styles.btnSecondary}>
                  <Plus size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {formData.features.map((feature, index) => (
                  <div key={index} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--admin-border)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem' }}>{feature}</span>
                    <button 
                      type="button" onClick={() => handleRemoveFeature(feature)}
                      style={{ color: 'var(--admin-danger)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {formData.features.length === 0 && (
                  <p style={{ textAlign: 'center', opacity: 0.4, fontSize: '0.85rem', margin: '1rem 0' }}>Aucune fonctionnalité ajoutée</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
