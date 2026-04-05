import React, { useState, useEffect } from 'react';
import ProjectModal from './ProjectModal';
import { projectService } from '../../services/projectService';
import styles from './Projects.module.css';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchProjects();
  }, []);

  // Logic to prevent body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProject]);

  const openModal = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  if (loading) return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>Chargement des projets...</div>
      </div>
    </section>
  );

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.bgGrid}></div>

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>// 02. Mes Réalisations</span>
          <h2 className={styles.title}>
            Projets <span className={styles.textGlow}>D'Exception.</span>
          </h2>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.windowDots}>
                  <span></span><span></span><span></span>
                </div>
                <span className={styles.category}>{project.category}</span>
              </div>

              <div className={styles.projectVisual}>
                <div className={styles.visualOverlay}></div>
                <div className={styles.visualGlow} style={{ background: `radial-gradient(circle, ${project.color}33 0%, transparent 70%)` }}></div>

                {project.screenshots && project.screenshots.length > 0 ? (
                  <div className={styles.imageWrapper}>
                    <img src={project.screenshots[0]} alt={project.title} className={styles.projectImg} />
                  </div>
                ) : (
                  <div className={styles.projectArt}>
                    <div className={styles.artBox} style={{ borderColor: `${project.color}44` }}></div>
                    <div className={styles.artCircle} style={{ background: `linear-gradient(135deg, ${project.color}, transparent)` }}></div>
                  </div>
                )}
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>

                <div className={styles.tags}>
                  {project.tags && project.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.projectLink}
                    onClick={() => openModal(project)}
                  >
                    Explorer le projet
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.mobileLiveBtn}
                    style={{ '--hover-color': project.color }}
                  >
                    Lancer
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21M21 3V9M21 3L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={closeModal} />
      )}
    </section>
  );
};

export default Projects;
