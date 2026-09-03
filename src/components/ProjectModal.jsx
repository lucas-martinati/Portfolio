import { useEffect } from 'react';
import { CloseIcon, ExternalLinkIcon, GithubIcon, ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from './Icons';
import { playSound } from '../utils/audio';

export default function ProjectModal({ project, allProjects = [], onSelectProject, onClose }) {
    useEffect(() => {
        if (!project) return;
        playSound('open');

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                playSound('close');
                onClose();
            } else if (e.key === 'ArrowRight') {
                const currentIndex = allProjects.findIndex((p) => p.title === project.title);
                if (currentIndex !== -1 && currentIndex < allProjects.length - 1) {
                    playSound('click');
                    onSelectProject(allProjects[currentIndex + 1]);
                }
            } else if (e.key === 'ArrowLeft') {
                const currentIndex = allProjects.findIndex((p) => p.title === project.title);
                if (currentIndex > 0) {
                    playSound('click');
                    onSelectProject(allProjects[currentIndex - 1]);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [project, allProjects, onSelectProject, onClose]);

    if (!project) return null;

    const currentIndex = allProjects.findIndex((p) => p.title === project.title);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex !== -1 && currentIndex < allProjects.length - 1;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            playSound('close');
            onClose();
        }
    };

    const hasImage = !!project.imageUrl;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
            <div className="modal-card">
                {/* Close Button */}
                <button
                    type="button"
                    className="modal-close-btn"
                    onClick={() => {
                        playSound('close');
                        onClose();
                    }}
                    aria-label="Fermer la fenêtre de détails"
                >
                    <CloseIcon size={20} />
                </button>

                {/* Banner / Cover */}
                <div className={`modal-banner ${hasImage ? 'has-cover' : 'gradient-banner'}`}>
                    {hasImage ? (
                        <img src={project.imageUrl} alt={project.title} className="modal-cover-img" />
                    ) : (
                        <span className="modal-emoji">{project.emoji || '🚀'}</span>
                    )}

                    {project.featured && (
                        <div className="modal-featured-badge">
                            <SparklesIcon size={14} />
                            <span>Projet Coup de Cœur</span>
                        </div>
                    )}
                </div>

                {/* Modal Body */}
                <div className="modal-body">
                    <div className="modal-header">
                        <div className="modal-meta">
                            <span className="modal-year">{project.year}</span>
                            <span className={`project-status ${project.status?.className || 'status-completed'}`}>
                                {project.status?.label || 'Terminé'}
                            </span>
                            <span className="modal-category-tag">
                                {project.category === 'extension' ? 'Extension' : project.category === 'system' ? 'Système & CLI' : 'Web & Full-Stack'}
                            </span>
                        </div>
                        <h2 className="modal-title">{project.title}</h2>
                    </div>

                    <p className="modal-description">{project.description}</p>

                    {/* Highlights & Impact */}
                    {project.highlights && (
                        <div className="modal-section-box highlight-box">
                            <div className="modal-box-header">
                                <SparklesIcon size={16} />
                                <h4>Points Forts &amp; Valeur Ajoutée</h4>
                            </div>
                            <p>{project.highlights}</p>
                        </div>
                    )}

                    {/* Challenges & Solutions */}
                    {project.challenges && (
                        <div className="modal-section-box challenge-box">
                            <div className="modal-box-header">
                                <span className="box-icon">⚡</span>
                                <h4>Défis Techniques Relevés</h4>
                            </div>
                            <p>{project.challenges}</p>
                        </div>
                    )}

                    {/* Tech Tags */}
                    <div className="modal-tags-wrap">
                        <span className="tags-label">Technologies utilisées :</span>
                        <div className="modal-tags">
                            {project.tags?.map((tag) => (
                                <span key={tag} className="tag tag-interactive">{tag}</span>
                            ))}
                        </div>
                    </div>

                    {/* Actions & Navigation */}
                    <div className="modal-footer">
                        <div className="modal-links">
                            {project.link?.href && (
                                <a
                                    href={project.link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary modal-action-btn"
                                    onClick={() => playSound('click')}
                                >
                                    {project.link.href.includes('github.com') ? (
                                        <GithubIcon size={18} />
                                    ) : (
                                        <ExternalLinkIcon size={18} />
                                    )}
                                    <span>{project.link.text || 'Accéder au projet'}</span>
                                </a>
                            )}
                        </div>

                        {/* Prev / Next controls */}
                        <div className="modal-nav-controls">
                            <button
                                type="button"
                                className="modal-nav-btn"
                                disabled={!hasPrev}
                                onClick={() => {
                                    if (hasPrev) {
                                        playSound('click');
                                        onSelectProject(allProjects[currentIndex - 1]);
                                    }
                                }}
                                title="Projet précédent (Flèche Gauche)"
                            >
                                <ArrowLeftIcon size={16} />
                                <span>Précédent</span>
                            </button>
                            <span className="modal-counter">
                                {currentIndex + 1} / {allProjects.length}
                            </span>
                            <button
                                type="button"
                                className="modal-nav-btn"
                                disabled={!hasNext}
                                onClick={() => {
                                    if (hasNext) {
                                        playSound('click');
                                        onSelectProject(allProjects[currentIndex + 1]);
                                    }
                                }}
                                title="Projet suivant (Flèche Droite)"
                            >
                                <span>Suivant</span>
                                <ArrowRightIcon size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
