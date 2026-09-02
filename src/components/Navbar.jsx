import { GithubIcon, LinkedinIcon, MailIcon } from './Icons';

export default function Navbar({ developer = {} }) {
    const handleClick = (e, targetId) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const githubUrl = developer.github || 'https://github.com/lucas-martinati';
    const linkedinUrl = developer.linkedin || 'https://www.linkedin.com/in/lucas-martinati-7452bb3b0/';
    const emailUrl = developer.email ? `mailto:${developer.email}` : 'mailto:lucasm54800@gmail.com';

    return (
        <header>
            <nav>
                <a href="#" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    LM_DEV
                </a>
                <ul className="nav-links">
                    <li><a href="#about" onClick={(e) => handleClick(e, 'about')}>À propos</a></li>
                    <li><a href="#projects" onClick={(e) => handleClick(e, 'projects')}>Projets</a></li>
                    <li><a href="#education" onClick={(e) => handleClick(e, 'education')}>Parcours</a></li>
                    <li><a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact</a></li>
                </ul>
                <div className="nav-socials">
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-icon-link"
                            aria-label={`GitHub de ${developer.name || 'Lucas Martinati'}`}
                            title="GitHub"
                        >
                            <GithubIcon size={19} />
                        </a>
                    )}
                    {linkedinUrl && (
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-icon-link"
                            aria-label={`LinkedIn de ${developer.name || 'Lucas Martinati'}`}
                            title="LinkedIn"
                        >
                            <LinkedinIcon size={19} />
                        </a>
                    )}
                    {emailUrl && (
                        <a
                            href={emailUrl}
                            className="nav-icon-link"
                            aria-label="Contacter par Email"
                            title="Email"
                        >
                            <MailIcon size={19} />
                        </a>
                    )}
                </div>
            </nav>
        </header>
    );
}

