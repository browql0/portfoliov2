import React, { useState, useEffect, useCallback } from 'react';
import styles from './ProjectModal.module.css';

const ProjectModal = ({ project, onClose }) => {
  const [activeImg, setActiveImg]     = useState(0);
  const [imgTransition, setImgTransition] = useState('idle');
  const [lightbox, setLightbox]       = useState(false); // fullscreen lightbox

  const hasScreenshots = project.screenshots && project.screenshots.length > 0;
  const totalImages    = hasScreenshots ? project.screenshots.length : 0;

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'Escape') {
        if (lightbox) setLightbox(false);
        else onClose();
      }
      if (e.key === 'ArrowLeft')  goTo((activeImg - 1 + totalImages) % totalImages);
      if (e.key === 'ArrowRight') goTo((activeImg + 1) % totalImages);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [activeImg, totalImages, lightbox, onClose]);

  const goTo = useCallback((index) => {
    if (index === activeImg || totalImages === 0) return;
    setImgTransition('out');
    setTimeout(() => {
      setActiveImg(index);
      setImgTransition('in');
      setTimeout(() => setImgTransition('idle'), 400);
    }, 220);
  }, [activeImg, totalImages]);

  const prev = () => goTo((activeImg - 1 + totalImages) % totalImages);
  const next = () => goTo((activeImg + 1) % totalImages);

  const imgClass = [
    styles.imageWrapper,
    imgTransition === 'out' ? styles.imgOut : '',
    imgTransition === 'in'  ? styles.imgIn  : '',
  ].filter(Boolean).join(' ');

  /* ══════════════════════════════════════════════════ */
  return (
    <>
      {/* ─── LIGHTBOX (fullscreen) ─── */}
      {lightbox && hasScreenshots && (
        <div className={styles.lightboxOverlay} onClick={() => setLightbox(false)}>
          <div className={styles.lightboxInner} onClick={(e) => e.stopPropagation()}>
            {/* Close lightbox */}
            <button className={styles.lightboxClose} onClick={() => setLightbox(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Counter */}
            {totalImages > 1 && (
              <div className={styles.lightboxCounter}>
                {activeImg + 1} / {totalImages}
              </div>
            )}

            {/* Main lightbox image */}
            <div className={styles.lightboxImgWrap}>
              <img
                src={project.screenshots[activeImg]}
                alt={`${project.title} — ${activeImg + 1}`}
                className={styles.lightboxImg}
                draggable={false}
              />
            </div>

            {/* Arrows */}
            {totalImages > 1 && (
              <>
                <button className={`${styles.lbArrow} ${styles.lbArrowLeft}`} onClick={prev}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className={`${styles.lbArrow} ${styles.lbArrowRight}`} onClick={next}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </>
            )}

            {/* Thumbnail strip */}
            {totalImages > 1 && (
              <div className={styles.lightboxThumbs}>
                {project.screenshots.map((src, idx) => (
                  <button
                    key={idx}
                    className={`${styles.lbThumb} ${activeImg === idx ? styles.lbThumbActive : ''}`}
                    onClick={() => goTo(idx)}
                    style={activeImg === idx ? { boxShadow: `0 0 0 2px ${project.color}` } : {}}
                  >
                    <img src={src} alt={`Vue ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MAIN MODAL ─── */}
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.modal}
          style={{ '--accent': project.color }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>

          <div className={styles.body}>

            {/* ════ LEFT — GALLERY ════ */}
            <div className={styles.gallery}>
              <div className={styles.ambientGlow} style={{ background: project.color }} />

              {project.featured && (
                <div className={styles.featuredBadge}>
                  <span className={styles.featuredDot} />
                  Showcase
                </div>
              )}

              {/* ── Main frame ── */}
              <div className={styles.mainFrame}>
                {hasScreenshots ? (
                  <>
                    <div
                      className={imgClass}
                      onClick={() => setLightbox(true)}
                      title="Cliquer pour agrandir"
                    >
                      <img
                        src={project.screenshots[activeImg]}
                        alt={`${project.title} — vue ${activeImg + 1}`}
                        className={styles.mainImg}
                        draggable={false}
                      />
                    </div>

                    {/* Zoom hint overlay */}
                    <div className={styles.zoomHint} onClick={() => setLightbox(true)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Agrandir
                    </div>
                  </>
                ) : (
                  <div className={styles.artPlaceholder}>
                    <div className={styles.artBox} style={{ borderColor: `${project.color}55` }} />
                    <div className={styles.artOrb} style={{ background: `radial-gradient(circle, ${project.color}88, transparent)` }} />
                    <span className={styles.artLabel}>{project.title}</span>
                  </div>
                )}

                {/* Arrows */}
                {totalImages > 1 && (
                  <>
                    <button className={`${styles.arrowBtn} ${styles.arrowLeft}`} onClick={prev} aria-label="Précédente">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className={`${styles.arrowBtn} ${styles.arrowRight}`} onClick={next} aria-label="Suivante">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>

                    {/* Dots */}
                    <div className={styles.dotNav}>
                      {project.screenshots.map((_, idx) => (
                        <button
                          key={idx}
                          className={`${styles.dot} ${activeImg === idx ? styles.dotActive : ''}`}
                          onClick={() => goTo(idx)}
                          aria-label={`Image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Counter */}
                {totalImages > 1 && (
                  <div className={styles.imageCounter}>
                    <span className={styles.counterCurrent}>{String(activeImg + 1).padStart(2, '0')}</span>
                    <span className={styles.counterSep}>/</span>
                    <span className={styles.counterTotal}>{String(totalImages).padStart(2, '0')}</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {totalImages > 1 && (
                <div className={styles.thumbsRow}>
                  {project.screenshots.map((src, idx) => (
                    <button
                      key={idx}
                      className={`${styles.thumb} ${activeImg === idx ? styles.thumbActive : ''}`}
                      onClick={() => goTo(idx)}
                      style={activeImg === idx ? { boxShadow: `0 0 0 2px ${project.color}` } : {}}
                    >
                      <img src={src} alt={`Miniature ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}

              <div className={styles.categoryStamp}>{project.category}</div>
            </div>

            {/* ════ RIGHT — INFO ════ */}
            <div className={styles.info}>
              <div className={styles.chip}>
                <span className={styles.chipDot} style={{ background: project.color }} />
                <span className={styles.chipText}>{project.category} · {project.tags?.[0]}</span>
              </div>

              <h2 className={styles.projectTitle}>{project.title}</h2>

              <div className={styles.techStack}>
                {project.tags?.map((tag, idx) => (
                  <span key={idx} className={styles.techTag} style={{ animationDelay: `${0.05 * idx}s` }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.divider} style={{ background: `linear-gradient(90deg, ${project.color}88, transparent)` }} />

              <div className={styles.statsRow}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Statut</span>
                  <span className={styles.statValue}><span className={styles.statusDot} />En ligne</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Rôle</span>
                  <span className={styles.statValue}>Fullstack Dev</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Type</span>
                  <span className={styles.statValue}>{project.category}</span>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.blockLabel}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Mission
                </div>
                <p className={styles.description}>{project.full_description || project.description}</p>
              </div>

              {project.features && project.features.length > 0 && (
                <div className={styles.infoBlock}>
                  <div className={styles.blockLabel}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Fonctionnalités clés
                  </div>
                  <ul className={styles.featureList}>
                    {project.features.map((feat, idx) => (
                      <li key={idx} className={styles.featureItem} style={{ animationDelay: `${0.1 * idx + 0.2}s` }}>
                        <span className={styles.featureBullet} style={{ background: project.color }} />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={styles.actions}>
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className={styles.btnPrimary} style={{ '--btn-color': project.color }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Voir le projet live
                </a>
                <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Voir le code source
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectModal;
