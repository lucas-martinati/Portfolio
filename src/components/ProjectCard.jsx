import { useRef, useCallback } from 'react';
import { SparklesIcon, ExternalLinkIcon, GithubIcon } from './Icons';
import { playSound } from '../utils/audio';

export default function ProjectCard({ project, index, onOpenModal }) {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
        let percentX = clamp((x - centerX) / centerX, -1, 1);
        let percentY = clamp((y - centerY) / centerY, -1, 1);
        const maxTilt = 5;
        const rotateX = -(percentY * maxTilt);
        const rotateY = percentX * maxTilt;
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.setProperty('--card-glow-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--card-glow-y', `${(y / rect.height) * 100}%`);
    }, []);

    const handleMouseLeave = useCallback(() => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }, []);

    const hasImage = !!project.imageUrl;

    // Vibrant gradients cycle
    const gradients = [
        ['#3b82f6', '#8b5cf6'],
        ['#8b5cf6', '#ec4899'],
        ['#06b6d4', '#10b981'],
        ['#10b981', '#f97316'],
        ['#ec4899', '#3b82f6'],
        ['#f97316', '#ec4899'],
        ['#3b82f6', '#06b6d4'],
        ['#8b5cf6', '#3b82f6'],
        ['#06b6d4', '#10b981'],
        ['#10b981', '#f97316']
    ];
    const [c1, c2] = gradients[index % gradients.length];

    const handleCardClick = (e) => {
        // If clicking on interactive elements directly, let them handle it
        if (e.target.closest('a') || e.target.closest('button')) return;
        playSound('click');
        if (onOpenModal) onOpenModal(project);
    };

    return (
        <article
            className={`project-card ${project.featured ? 'is-featured' : ''}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleCardClick}
        >
            {/* Glow overlay */}
            <div className="project-card-glow"></div>

            {/* Featured Badge */}
            {project.featured && (
                <div className="card-featured-pill">
                    <SparklesIcon size={12} />
                    <span>Coup de cœur</span>
                </div>
            )}

            {/* Image / Emoji banner */}
            <div
                className={`project-banner${hasImage ? ' has-cover' : ''}`}
                style={!hasImage ? { background: `linear-gradient(135deg, ${c1}, ${c2})` } : undefined}
            >
                {hasImage ? (
                    <img src={project.imageUrl} alt={project.title} className="project-cover" loading="lazy" />
                ) : (
                    <span className="project-emoji">{project.emoji}</span>
                )}
            </div>

            {/* Content */}
            <div className="project-body">
                <div className="project-meta">
                    <span className="project-year">{project.year}</span>
                    <span className={`project-status ${project.status?.className || 'status-completed'}`}>
                        {project.status?.label || 'Terminé'}
                    </span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-footer">
                    <div className="project-tags">
                        {project.tags?.slice(0, 4).map((tag) => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                        {project.tags && project.tags.length > 4 && (
                            <span className="tag tag-more">+{project.tags.length - 4}</span>
                        )}
                    </div>

                    <div className="project-actions-row">
                        <button
                            type="button"
                            className="card-quick-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                playSound('click');
                                if (onOpenModal) onOpenModal(project);
                            }}
                        >
                            Fiche détaillée
                        </button>

                        {project.link && (
                            <a
                                href={project.link.href}
                                className="project-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playSound('click');
                                }}
                            >
                                <span>{project.link.text}</span>
                                {project.link.href.includes('github.com') ? (
                                    <GithubIcon size={14} />
                                ) : (
                                    <ExternalLinkIcon size={14} />
                                )}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
}
