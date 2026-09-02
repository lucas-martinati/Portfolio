import { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon } from './Icons';

export default function Navbar({ developer = {} }) {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const sections = ['about', 'projects', 'education', 'contact'];

        const handleScroll = () => {
            // Tout en haut de page (dans le Hero) : aucun onglet n'est actif
            if (window.scrollY < 300) {
                setActiveSection('');
                return;
            }

            // Tout en bas de la page : activer directement Contact
            const isBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60;
            if (isBottom) {
                setActiveSection('contact');
                return;
            }

            let current = '';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    // La section est actuellement visible au tiers supérieur de l'écran
                    if (rect.top <= 250 && rect.bottom >= 150) {
                        current = id;
                    }
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                    <li>
                        <a
                            href="#about"
                            className={activeSection === 'about' ? 'active' : ''}
                            onClick={(e) => handleClick(e, 'about')}
                        >
                            À propos
                        </a>
                    </li>
                    <li>
                        <a
                            href="#projects"
                            className={activeSection === 'projects' ? 'active' : ''}
                            onClick={(e) => handleClick(e, 'projects')}
                        >
                            Projets
                        </a>
                    </li>
                    <li>
                        <a
                            href="#education"
                            className={activeSection === 'education' ? 'active' : ''}
                            onClick={(e) => handleClick(e, 'education')}
                        >
                            Parcours
                        </a>
                    </li>
                    <li>
                        <a
                            href="#contact"
                            className={activeSection === 'contact' ? 'active' : ''}
                            onClick={(e) => handleClick(e, 'contact')}
                        >
                            Contact
                        </a>
                    </li>
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

