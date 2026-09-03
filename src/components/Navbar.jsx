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

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (!mobileMenuOpen) return;
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [mobileMenuOpen]);

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
        <>
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

                {/* Desktop Nav Controls (hidden on mobile) */}
                <div className="nav-desktop-actions">
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
                </div>

                {/* Mobile Header Controls (visible only on mobile) */}
                <div className="nav-mobile-controls">
                    <button
                        type="button"
                        className="mobile-nav-toggle"
                        onClick={() => {
                            playSound('click');
                            setMobileMenuOpen(!mobileMenuOpen);
                        }}
                        aria-label="Menu de navigation"
                        aria-expanded={mobileMenuOpen}
                    >
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                    </button>
                </div>
            </nav>
        </header>

        {/* Mobile Nav Overlay & Drawer (rendered outside header so containing block is true viewport) */}
        {mobileMenuOpen && (
            <div className="mobile-nav-container">
                <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)} />
                <div className="mobile-nav-menu" role="dialog" aria-modal="true" aria-label="Menu de navigation mobile">
                    <div className="mobile-nav-links">
                        <a
                            href="#about"
                            className={`mobile-nav-link ${activeSection === 'about' ? 'active' : ''}`}
                            onClick={(e) => handleClick(e, 'about')}
                        >
                            <span>À propos</span>
                            <span className="mobile-link-arrow">→</span>
                        </a>
                        <a
                            href="#projects"
                            className={`mobile-nav-link ${activeSection === 'projects' ? 'active' : ''}`}
                            onClick={(e) => handleClick(e, 'projects')}
                        >
                            <span>Projets</span>
                            <span className="mobile-link-pill">16+</span>
                        </a>
                        {isSeeking && (
                            <a
                                href="#recruiter"
                                className={`mobile-nav-link recruiter ${activeSection === 'recruiter' ? 'active' : ''}`}
                                onClick={(e) => handleClick(e, 'recruiter')}
                            >
                                <span>🎯 Espace Recruteur</span>
                                <span className="mobile-link-arrow">→</span>
                            </a>
                        )}
                        <a
                            href="#education"
                            className={`mobile-nav-link ${activeSection === 'education' ? 'active' : ''}`}
                            onClick={(e) => handleClick(e, 'education')}
                        >
                            <span>Parcours &amp; Diplômes</span>
                            <span className="mobile-link-arrow">→</span>
                        </a>
                        <a
                            href="#contact"
                            className={`mobile-nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                            onClick={(e) => handleClick(e, 'contact')}
                        >
                            <span>Contact &amp; Réseaux</span>
                            <span className="mobile-link-arrow">→</span>
                        </a>
                    </div>

                    <div className="mobile-nav-divider" />

                    {/* Sound Action */}
                    <div className="mobile-actions-panel">
                        <button
                            type="button"
                            className={`mobile-action-card-btn mobile-sound-card-btn ${soundActive ? 'active' : ''}`}
                            onClick={handleSoundToggle}
                        >
                            {soundActive ? <VolumeUpIcon size={18} /> : <VolumeOffIcon size={18} />}
                            <span>{soundActive ? 'Effets sonores : Activés' : 'Effets sonores : Désactivés'}</span>
                        </button>
                    </div>

                    {/* Social Icons row */}
                    <div className="mobile-socials-grid">
                        {githubUrl && (
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mobile-social-tile"
                                onClick={() => playSound('click')}
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
                                className="mobile-social-tile"
                                onClick={() => playSound('click')}
                            >
                                <LinkedinIcon size={20} />
                                <span>LinkedIn</span>
                            </a>
                        )}
                        {emailUrl && (
                            <a
                                href={emailUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mobile-social-tile"
                                onClick={() => playSound('click')}
                            >
                                <MailIcon size={20} />
                                <span>Email</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        )}
    </>
    );
}
