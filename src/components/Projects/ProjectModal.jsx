import React, { useState, useEffect } from 'react';
import styles from './ProjectModal.module.css';

const ProjectModal = ({ project, onClose }) => {
  const [activeImg, setActiveImg] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleImageChange = (index) => {
    if (index === activeImg) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveImg(index);
      setIsFading(false);
    }, 300);
  };

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div 
        className={styles.modal} 
        style={{ '--project-color': project.color }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className={styles.modalContent}>
          {/* PREMIUM GALLERY SECTION */}
          <div className={styles.visualSection} style={{ background: `radial-gradient(circle at center, ${project.color}33, #020617)` }}>
            {project.featured && <div className={styles.modalFeaturedBadge}>Showcase</div>}
            
            <div className={styles.galleryContainer}>
              <div className={styles.mainPreview}>
                {/* Back-glow effect */}
                <div className={styles.imageBackGlow} style={{ backgroundColor: project.color }}></div>
                
                {hasScreenshots ? (
                  <div className={`${styles.imageWrapper} ${isFading ? styles.fadeOut : ''}`}>
                    <img 
                      src={project.screenshots[activeImg]} 
                      alt={`${project.title} preview`} 
                      className={styles.mainImg}
                    />
                  </div>
                ) : (
                  <div className={styles.projectArtLarge}>
                    <div className={styles.artBoxLarge} style={{ borderColor: `${project.color}44` }}></div>
                    <div className={styles.artCircleLarge} style={{ background: `linear-gradient(135deg, ${project.color}, transparent)` }}></div>
                  </div>
                )}
              </div>

              {/* Thumbnails Navigation */}
              {hasScreenshots && project.screenshots.length > 1 && (
                <div className={styles.thumbnailsBar}>
                  {project.screenshots.map((src, idx) => (
                    <button 
                      key={idx} 
                      className={`${styles.thumbBtn} ${activeImg === idx ? styles.activeThumb : ''}`}
                      onClick={() => handleImageChange(idx)}
                    >
                      <img src={src} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className={styles.visualBadge}>{project.category}</div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoHeader}>
              <div className={styles.projectIdentity}>
                <div className={styles.idCircle} style={{ background: project.color }}></div>
                <span className={styles.idBrand}>{project.category} // {project.tags[0]}</span>
              </div>
              <h2 className={styles.title} style={{ backgroundImage: `linear-gradient(to right, #fff, ${project.color})` }}>
                {project.title}
              </h2>
              <div className={styles.tags}>
                {project.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tag} style={{ animationDelay: `${idx * 0.1}s` }}>{tag}</span>
                ))}
              </div>
            </div>

            <div className={styles.detailsLayout}>
              <div className={styles.mainInfo}>
                {/* QUICK SPECS - DASHBOARD FEEL */}
                <div className={styles.quickSpecs}>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Status</span>
                    <span className={styles.specValue}><span className={styles.statusDot}></span> Live</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Category</span>
                    <span className={styles.specValue}>{project.category}</span>
                  </div>
                  <div className={styles.specItem}>
                    <span className={styles.specLabel}>Role</span>
                    <span className={styles.specValue}>Fullstack Developer</span>
                  </div>
                </div>

                <div className={styles.descriptionSection}>
                  <div className={styles.sectionLabel}>// Mission & Context</div>
                  <p className={styles.fullDescription}>{project.fullDescription}</p>
                </div>

                <div className={styles.featuresSection}>
                  <div className={styles.sectionLabel}>// Key Features & Architecture</div>
                  <div className={styles.featureGrid}>
                    {project.features.map((feature, idx) => (
                      <div key={idx} className={styles.featureCard} style={{ animationDelay: `${0.3 + idx * 0.1}s` }}>
                        <div className={styles.featureIcon} style={{ background: `${project.color}15`, color: project.color }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className={styles.featureText}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.sideInfo}>
                <div className={styles.modalActions}>
                  <div className={styles.sectionLabel}>// Launch Project</div>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.liveBtn} style={{ backgroundColor: project.color }}>
                    Open App
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className={styles.githubBtn}>
                    <span>Repository</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
