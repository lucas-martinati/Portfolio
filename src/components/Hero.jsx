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
                    <span>Disponible pour alternance &amp; projets</span>
                </div>

                <h1 className="hero-title">{developer.name || 'Lucas Martinati'}</h1>
                <p className="hero-role">Développeur Full-Stack &amp; Étudiant Passionné</p>
                <p className="hero-tagline">
                    Concepteur d'applications web modernes, d'extensions navigateurs et d'outils d'automatisation.
                </p>

                <div className="hero-cta-group">
                    <a
                        href="#projects"
                        className="btn-primary"
                        onClick={(e) => handleScrollTo(e, 'projects')}
                    >
                        <span>Voir mes réalisations</span>
                        <ArrowRightIcon size={18} />
                    </a>

                    <a
                        href="#contact"
                        className="btn-secondary"
                        onClick={(e) => handleScrollTo(e, 'contact')}
                    >
                        <MailIcon size={18} />
                        <span>Me contacter</span>
                    </a>
                </div>

                <div className="hero-social-minimal">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-circle github-circle"
                            aria-label={`GitHub de ${developer.name || 'Lucas Martinati'}`}
                            title="GitHub"
                        >
                            <GithubIcon size={18} />
                        </a>
                    )}

                    {linkedinUrl && (
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-circle linkedin-circle"
                            aria-label={`LinkedIn de ${developer.name || 'Lucas Martinati'}`}
                            title="LinkedIn"
                        >
                            <LinkedinIcon size={18} />
                        </a>
                    )}

                    {emailUrl && (
                        <a
                            href={emailUrl}
                            className="hero-social-circle email-circle"
                            aria-label={`Envoyer un email à ${developer.name || 'Lucas Martinati'}`}
                            title="Email"
                        >
                            <MailIcon size={18} />
                        </a>
                    )}
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

