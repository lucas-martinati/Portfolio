import { GithubIcon, LinkedinIcon, MailIcon, ArrowRightIcon } from './Icons';

export default function Hero({ developer = {} }) {
    const handleScrollTo = (e, id) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const githubUrl = developer.github || 'https://github.com/lucas-martinati';
    const linkedinUrl = developer.linkedin || 'https://www.linkedin.com/in/lucas-martinati-7452bb3b0/';
    const emailUrl = developer.email ? `mailto:${developer.email}` : 'mailto:lucasm54800@gmail.com';

    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-badge">
                    <span className="status-indicator"></span>
                    <span>Disponible pour de nouveaux projets</span>
                </div>
                <h1>{developer.name || 'Lucas Martinati'}</h1>
                <p className="subtitle">Développeur Créatif &amp; Étudiant Passionné</p>

                <div className="hero-actions">
                    <a
                        href="#projects"
                        className="btn-primary"
                        onClick={(e) => handleScrollTo(e, 'projects')}
                    >
                        <span>Voir mes projets</span>
                        <ArrowRightIcon size={18} />
                    </a>

                    <div className="hero-social-links">
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn github-btn"
                                aria-label={`Profil GitHub de ${developer.name || 'Lucas Martinati'}`}
                            >
                                <GithubIcon size={20} />
                                <span>GitHub</span>
                            </a>
                        )}

                        {linkedinUrl && (
                            <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-btn linkedin-btn"
                                aria-label={`Profil LinkedIn de ${developer.name || 'Lucas Martinati'}`}
                            >
                                <LinkedinIcon size={20} />
                                <span>LinkedIn</span>
                            </a>
                        )}

                        {emailUrl && (
                            <a
                                href={emailUrl}
                                className="social-btn email-btn"
                                aria-label={`Envoyer un email à ${developer.name || 'Lucas Martinati'}`}
                            >
                                <MailIcon size={20} />
                                <span>Email</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <a
                href="#about"
                className="scroll-indicator"
                aria-label="Faire défiler vers le contenu"
                onClick={(e) => handleScrollTo(e, 'about')}
            >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
        </section>
    );
}

