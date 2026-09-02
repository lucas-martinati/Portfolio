import { useState, useEffect } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, TerminalIcon, VolumeUpIcon, VolumeOffIcon, CommandIcon } from './Icons';
import { playSound, isSoundEnabled, toggleSound } from '../utils/audio';

export default function Navbar({ developer = {}, onOpenPalette, onShowToast }) {
    const [activeSection, setActiveSection] = useState('');
    const [soundActive, setSoundActive] = useState(isSoundEnabled());
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isSeeking = developer.recruitment?.enabled ?? developer.recruitment?.seeking ?? true;

    useEffect(() => {
        const sections = isSeeking
            ? ['about', 'projects', 'recruiter', 'education', 'contact']
            : ['about', 'projects', 'education', 'contact'];

        const handleScroll = () => {
            if (window.scrollY < 200) {
                setActiveSection('');
                return;
            }

            const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
            if (isBottom) {
                setActiveSection('contact');
                return;
            }

            let current = '';
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 260 && rect.bottom >= 120) {
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
        playSound('click');
        setMobileMenuOpen(false);
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSoundToggle = () => {
        const nextState = toggleSound();
        setSoundActive(nextState);
        if (onShowToast) {
            onShowToast(nextState ? 'Effets sonores activés !' : 'Effets sonores désactivés.', 'info');
        }
    };

    const githubUrl = developer.github || 'https://github.com/lucas-martinati';
    const linkedinUrl = developer.linkedin || 'https://www.linkedin.com/in/lucas-martinati-7452bb3b0/';
    const emailUrl = developer.email ? `mailto:${developer.email}` : 'mailto:lucasm54800@gmail.com';

    return (
        <header>
            <nav>
                <a
                    href="#"
                    className="logo"
                    onClick={(e) => {
                        e.preventDefault();
                        playSound('click');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <span className="logo-accent">LM</span>_DEV
                </a>

                {/* Desktop Nav Links */}
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
                    {isSeeking && (
                        <li>
                            <a
                                href="#recruiter"
                                className={`nav-recruiter-link ${activeSection === 'recruiter' ? 'active' : ''}`}
                                onClick={(e) => handleClick(e, 'recruiter')}
                            >
                                <span className="nav-pulse-dot"></span>
                                Recrutement
                            </a>
                        </li>
                    )}
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

                {/* Nav Actions */}
                <div className="nav-socials">
                    {/* Command Palette Trigger */}
                    {onOpenPalette && (
                        <button
                            type="button"
                            className="nav-cmd-btn"
                            onClick={() => {
                                playSound('click');
                                onOpenPalette();
                            }}
                            title="Ouvrir le terminal ou la palette d'actions (Cmd+K)"
                            aria-label="Palette de commandes"
                        >
                            <TerminalIcon size={16} />
                            <span className="nav-cmd-text">Terminal</span>
                            <span className="nav-cmd-kbd">⌘K</span>
                        </button>
                    )}

                    {/* Sound Toggle */}
                    <button
                        type="button"
                        className={`nav-icon-link nav-sound-btn ${soundActive ? 'sound-on' : ''}`}
                        onClick={handleSoundToggle}
                        title={soundActive ? 'Désactiver les effets sonores' : 'Activer les effets sonores'}
                        aria-label="Effets sonores"
                    >
                        {soundActive ? <VolumeUpIcon size={17} /> : <VolumeOffIcon size={17} />}
                    </button>

                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-icon-link"
                            aria-label={`GitHub de ${developer.name || 'Lucas Martinati'}`}
                            title="GitHub"
                            onClick={() => playSound('hover')}
                        >
                            <GithubIcon size={18} />
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
                            onClick={() => playSound('hover')}
                        >
                            <LinkedinIcon size={18} />
                        </a>
                    )}
                    {emailUrl && (
                        <a
                            href={emailUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-icon-link"
                            aria-label={`Envoyer un email à ${developer.name || 'Lucas Martinati'}`}
                            title="Email"
                            onClick={() => playSound('hover')}
                        >
                            <MailIcon size={18} />
                        </a>
                    )}

                    {/* Mobile Hamburger Toggle */}
                    <button
                        type="button"
                        className="mobile-nav-toggle"
                        onClick={() => {
                            playSound('click');
                            setMobileMenuOpen(!mobileMenuOpen);
                        }}
                        aria-label="Menu de navigation"
                    >
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Nav Overlay */}
            {mobileMenuOpen && (
                <div className="mobile-nav-menu">
                    <a href="#about" onClick={(e) => handleClick(e, 'about')}>À propos</a>
                    <a href="#projects" onClick={(e) => handleClick(e, 'projects')}>Projets</a>
                    {isSeeking && (
                        <a href="#recruiter" className="mobile-recruiter-link" onClick={(e) => handleClick(e, 'recruiter')}>
                            🟢 Recrutement Alternance
                        </a>
                    )}
                    <a href="#education" onClick={(e) => handleClick(e, 'education')}>Parcours</a>
                    <a href="#contact" onClick={(e) => handleClick(e, 'contact')}>Contact</a>
                    {onOpenPalette && (
                        <button
                            type="button"
                            className="mobile-cmd-btn"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                onOpenPalette();
                            }}
                        >
                            <TerminalIcon size={16} />
                            <span>Terminal &amp; Recherche (Cmd+K)</span>
                        </button>
                    )}
                </div>
            )}
        </header>
    );
}
