import { useState, useEffect, useRef } from 'react';
import {
    CloseIcon,
    SearchIcon,
    TerminalIcon,
    CommandIcon,
    ArrowRightIcon,
    SparklesIcon,
    GithubIcon,
    LinkedinIcon,
    MailIcon,
    BriefcaseIcon
} from './Icons';
import { playSound, isSoundEnabled, toggleSound } from '../utils/audio';

export default function CommandPalette({
    isOpen,
    onClose,
    developer = {},
    projects = [],
    onSelectProject,
    onShowToast
}) {
    const isSeeking = developer.recruitment?.enabled ?? developer.recruitment?.seeking ?? true;
    const [mode, setMode] = useState('palette'); // 'palette' | 'terminal'
    const [query, setQuery] = useState('');
    const [terminalHistory, setTerminalHistory] = useState([
        { type: 'system', text: 'Bienvenue sur le terminal interactif de Lucas Martinati (v1.0.0).' },
        { type: 'system', text: 'Tapez "help" pour afficher la liste des commandes disponibles.' }
    ]);
    const [commandInput, setCommandInput] = useState('');
    const [cmdHistoryList, setCmdHistoryList] = useState([]);
    const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);

    const inputRef = useRef(null);
    const terminalBottomRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            playSound('open');
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 50);

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    useEffect(() => {
        if (mode === 'terminal') {
            terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [terminalHistory, mode]);

    if (!isOpen) return null;

    const handleScrollTo = (id) => {
        playSound('click');
        onClose();
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCopyEmail = async () => {
        playSound('success');
        try {
            await navigator.clipboard.writeText(developer.email || 'lucasm54800@gmail.com');
            if (onShowToast) onShowToast('Email copié dans le presse-papier !', 'success');
        } catch {
            if (onShowToast) onShowToast('Email : ' + (developer.email || 'lucasm54800@gmail.com'), 'info');
        }
        onClose();
    };

    const handleSoundToggle = () => {
        const next = toggleSound();
        if (onShowToast) {
            onShowToast(next ? 'Effets sonores activés !' : 'Effets sonores désactivés.', 'info');
        }
    };

    // Terminal command execution
    const handleCommandSubmit = (e) => {
        e.preventDefault();
        const raw = commandInput.trim();
        if (!raw) return;

        playSound('terminal');
        const nextHistory = [...terminalHistory, { type: 'input', text: raw }];
        setCmdHistoryList((prev) => [...prev, raw]);
        setCmdHistoryIndex(-1);
        setCommandInput('');

        const cmd = raw.toLowerCase();

        if (cmd === 'clear') {
            setTerminalHistory([]);
            return;
        }

        if (cmd === 'exit') {
            playSound('close');
            onClose();
            return;
        }

        if (cmd === 'palette') {
            setMode('palette');
            return;
        }

        if (cmd === 'help') {
            nextHistory.push({
                type: 'output',
                text: `Commandes disponibles :
  whoami       - Présentation rapide de Lucas
  skills       - Liste des compétences & technologies
  projects     - Liste des projets majeurs
  recruiter    - Informations pour recruteurs / alternance
  contact      - Coordonnées & réseaux
  sound        - Basculer les effets sonores
  clear        - Effacer le terminal
  palette      - Retourner au mode Palette de commande
  exit         - Fermer le terminal`
            });
        } else if (cmd === 'whoami') {
            nextHistory.push({
                type: 'output',
                text: `${developer.name || 'Lucas Martinati'} — ${developer.status || 'Étudiant en BUT Informatique'}
Passion : ${developer.passion || 'Informatique & Développement'}
Mindset : ${developer.mindset || 'Organisé, rigoureux et proactif'}
Localisation : Nancy / Région Grand Est`
            });
        } else if (cmd === 'skills') {
            nextHistory.push({
                type: 'output',
                text: `Stack Technique :
• Frontend : React, Next.js, TypeScript, HTML/CSS, Vite, Tailwind CSS
• Mobile & Extensions : Capacitor, Extensions Chrome, Extensions VS Code
• Backend & Cloud : Firebase, REST APIs, JSON, Serverless
• Système & Scripts : Linux (Ubuntu/GNOME), Bash, Systemd, Python (PyQt5)
• Algorithmique : UML, MCD, Mathématiques expertes`
            });
        } else if (cmd === 'projects') {
            const projectList = projects.slice(0, 7).map((p) => `  • ${p.title} (${p.year}) - [${p.tags?.join(', ')}]`).join('\n');
            nextHistory.push({
                type: 'output',
                text: `Projets sélectionnés (sur ${projects.length} au total) :\n${projectList}\n(Consultez la section Projets pour les tester directement !)`
            });
        } else if (cmd === 'recruiter' || cmd === 'hire') {
            const r = developer.recruitment || {};
            if (isSeeking) {
                nextHistory.push({
                    type: 'output',
                    text: `🎯 Profil Alternance :
• Diplôme visé : ${r.degree || "BUT Informatique (Bac+3) ➔ Diplôme d'Ingénieur (Bac+5)"}
• Établissement : ${r.school || "IUT Nancy-Charlemagne ➔ Télécom Nancy"}
• Contrat : ${r.contract || "Apprentissage / Professionnalisation"}
• Période cible : ${r.period || "2027 - 2028 (1 an en BUT 3) • Poursuite visée en école d'ingénieurs (Télécom Nancy)"}
• Mobilité : ${r.location || "Nancy / Grand Est / Télétravail"}
• Stack : ${r.stack || "React, Next.js, TypeScript, Python, Linux, Bash"}
Tapez "contact" pour échanger !`
                });
            } else {
                nextHistory.push({
                    type: 'output',
                    text: `💼 Statut Professionnel :
• ${r.passiveBadge || "Actuellement en poste / Non en recherche active d'alternance."}
• Toujours ouvert aux échanges technologiques, projets open-source et collaborations.
Tapez "contact" pour échanger !`
                });
            }
        } else if (cmd === 'contact') {
            nextHistory.push({
                type: 'output',
                text: `📬 Coordonnées :
• Email : ${developer.email || 'lucasm54800@gmail.com'}
• GitHub : ${developer.github || 'https://github.com/lucas-martinati'}
• LinkedIn : ${developer.linkedin || 'https://www.linkedin.com/in/lucas-martinati-7452bb3b0/'}`
            });
        } else if (cmd === 'sound') {
            const state = toggleSound();
            nextHistory.push({
                type: 'output',
                text: state ? '🔊 Effets sonores activés !' : '🔇 Effets sonores désactivés.'
            });
        } else if (cmd === 'sudo hire' || cmd === 'sudo hire lucas') {
            nextHistory.push({
                type: 'output',
                text: '🚀 Permission accordée ! Excellent choix. Email de contact : ' + (developer.email || 'lucasm54800@gmail.com')
            });
            playSound('success');
        } else {
            nextHistory.push({
                type: 'error',
                text: `Commande non reconnue : "${raw}". Tapez "help" pour voir la liste des commandes.`
            });
        }

        setTerminalHistory(nextHistory);
    };

    // Filter projects based on query
    const filteredProjects = query.trim()
        ? projects.filter(
            (p) =>
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                (p.tags && p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))) ||
                (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
        )
        : [];

    return (
        <div
            className="command-palette-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    playSound('close');
                    onClose();
                }
            }}
            role="dialog"
            aria-modal="true"
        >
            <div className="command-palette-card">
                {/* Header Switcher */}
                <div className="palette-header">
                    <div className="palette-tabs">
                        <button
                            type="button"
                            className={`palette-tab ${mode === 'palette' ? 'active' : ''}`}
                            onClick={() => {
                                playSound('click');
                                setMode('palette');
                            }}
                        >
                            <CommandIcon size={15} />
                            <span>Commandes &amp; Recherche</span>
                        </button>
                        <button
                            type="button"
                            className={`palette-tab ${mode === 'terminal' ? 'active' : ''}`}
                            onClick={() => {
                                playSound('click');
                                setMode('terminal');
                            }}
                        >
                            <TerminalIcon size={15} />
                            <span>Terminal Bash</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="palette-close-btn"
                        onClick={() => {
                            playSound('close');
                            onClose();
                        }}
                        aria-label="Fermer"
                    >
                        <CloseIcon size={18} />
                    </button>
                </div>

                {/* Mode Palette */}
                {mode === 'palette' ? (
                    <div className="palette-body">
                        <div className="palette-input-wrap">
                            <SearchIcon size={18} className="palette-search-icon" />
                            <input
                                ref={inputRef}
                                type="text"
                                className="palette-input"
                                placeholder="Rechercher une section, un projet, une commande..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <button
                                    type="button"
                                    className="palette-input-clear"
                                    onClick={() => setQuery('')}
                                >
                                    &times;
                                </button>
                            )}
                        </div>

                        <div className="palette-results">
                            {/* Matching Projects */}
                            {filteredProjects.length > 0 && (
                                <div className="palette-group">
                                    <div className="palette-group-title">
                                        <SparklesIcon size={14} />
                                        <span>Projets correspondants</span>
                                    </div>
                                    {filteredProjects.slice(0, 5).map((proj) => (
                                        <div
                                            key={proj.title}
                                            className="palette-item"
                                            onClick={() => {
                                                playSound('click');
                                                onClose();
                                                if (onSelectProject) onSelectProject(proj);
                                            }}
                                        >
                                            <div className="palette-item-left">
                                                <span className="palette-item-emoji">{proj.emoji || '🚀'}</span>
                                                <div>
                                                    <div className="palette-item-title">{proj.title}</div>
                                                    <div className="palette-item-sub">
                                                        {proj.tags?.slice(0, 3).join(' • ')}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="palette-item-action">Ouvrir fiche</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quick Navigation Actions */}
                            <div className="palette-group">
                                <div className="palette-group-title">
                                    <ArrowRightIcon size={14} />
                                    <span>Navigation rapide</span>
                                </div>

                                {isSeeking && (
                                    <div className="palette-item" onClick={() => handleScrollTo('recruiter')}>
                                        <div className="palette-item-left">
                                            <span className="palette-item-icon">
                                                <BriefcaseIcon size={17} />
                                            </span>
                                            <div>
                                                <div className="palette-item-title">Espace Recruteur &amp; Alternance</div>
                                                <div className="palette-item-sub">Synthèse du profil, atouts clés et disponibilité</div>
                                            </div>
                                        </div>
                                        <span className="palette-item-shortcut">Aller</span>
                                    </div>
                                )}

                                <div className="palette-item" onClick={() => handleScrollTo('projects')}>
                                    <div className="palette-item-left">
                                        <span className="palette-item-icon">🔥</span>
                                        <div>
                                            <div className="palette-item-title">Explorer les {projects.length} Projets</div>
                                            <div className="palette-item-sub">Filtres Web, Extensions Chrome/VSCode et Scripts Linux</div>
                                        </div>
                                    </div>
                                    <span className="palette-item-shortcut">Aller</span>
                                </div>

                                <div className="palette-item" onClick={() => handleScrollTo('about')}>
                                    <div className="palette-item-left">
                                        <span className="palette-item-icon">💻</span>
                                        <div>
                                            <div className="palette-item-title">À propos &amp; CodeBio</div>
                                            <div className="palette-item-sub">Vision, état d'esprit et stack technique</div>
                                        </div>
                                    </div>
                                    <span className="palette-item-shortcut">Aller</span>
                                </div>

                                <div className="palette-item" onClick={() => handleScrollTo('education')}>
                                    <div className="palette-item-left">
                                        <span className="palette-item-icon">🎓</span>
                                        <div>
                                            <div className="palette-item-title">Parcours &amp; Certifications</div>
                                            <div className="palette-item-sub">BUT Informatique, Bac Mention Bien &amp; Score PIX 583</div>
                                        </div>
                                    </div>
                                    <span className="palette-item-shortcut">Aller</span>
                                </div>

                                <div className="palette-item" onClick={() => handleScrollTo('contact')}>
                                    <div className="palette-item-left">
                                        <span className="palette-item-icon">
                                            <MailIcon size={17} />
                                        </span>
                                        <div>
                                            <div className="palette-item-title">Me Contacter</div>
                                            <div className="palette-item-sub">Email, LinkedIn et GitHub direct</div>
                                        </div>
                                    </div>
                                    <span className="palette-item-shortcut">Aller</span>
                                </div>
                            </div>

                            {/* Utility Actions */}
                            <div className="palette-group">
                                <div className="palette-group-title">
                                    <SparklesIcon size={14} />
                                    <span>Actions instantanées</span>
                                </div>

                                <div className="palette-item" onClick={handleCopyEmail}>
                                    <div className="palette-item-left">
                                        <span className="palette-item-icon">📋</span>
                                        <div>
                                            <div className="palette-item-title">Copier l'adresse email</div>
                                            <div className="palette-item-sub">{developer.email || 'lucasm54800@gmail.com'}</div>
                                        </div>
                                    </div>
                                    <span className="palette-item-action">Copier</span>
                                </div>

                                <div
                                    className="palette-item"
                                    onClick={() => {
                                        playSound('click');
                                        setMode('terminal');
                                    }}
                                >
                                    <div className="palette-item-left">
                                        <span className="palette-item-icon">
                                            <TerminalIcon size={17} />
                                        </span>
                                        <div>
                                            <div className="palette-item-title">Ouvrir le Terminal Interactif</div>
                                            <div className="palette-item-sub">Commandes shell bash (whoami, skills, hire...)</div>
                                        </div>
                                    </div>
                                    <span className="palette-item-action">Shell</span>
                                </div>

                                <div className="palette-item" onClick={handleSoundToggle}>
                                    <div className="palette-item-left">
                                        <span className="palette-item-icon">{isSoundEnabled() ? '🔊' : '🔇'}</span>
                                        <div>
                                            <div className="palette-item-title">
                                                {isSoundEnabled() ? 'Désactiver les effets sonores' : 'Activer les effets sonores'}
                                            </div>
                                            <div className="palette-item-sub">Feedback audio synthétique Web Audio API</div>
                                        </div>
                                    </div>
                                    <span className="palette-item-action">Toggle</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Terminal Mode */
                    <div className="terminal-view">
                        <div className="terminal-screen">
                            {terminalHistory.map((item, idx) => (
                                <div key={idx} className={`terminal-line terminal-${item.type}`}>
                                    {item.type === 'input' && (
                                        <span className="terminal-prompt">lucas@portfolio:~$ </span>
                                    )}
                                    <pre className="terminal-text">{item.text}</pre>
                                </div>
                            ))}
                            <div ref={terminalBottomRef} />
                        </div>

                        <form className="terminal-input-bar" onSubmit={handleCommandSubmit}>
                            <span className="terminal-prompt">lucas@portfolio:~$ </span>
                            <input
                                ref={inputRef}
                                type="text"
                                className="terminal-input"
                                value={commandInput}
                                onChange={(e) => setCommandInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'ArrowUp') {
                                        if (cmdHistoryList.length > 0) {
                                            const nextIdx = cmdHistoryIndex === -1 ? cmdHistoryList.length - 1 : Math.max(0, cmdHistoryIndex - 1);
                                            setCmdHistoryIndex(nextIdx);
                                            setCommandInput(cmdHistoryList[nextIdx]);
                                        }
                                    } else if (e.key === 'ArrowDown') {
                                        if (cmdHistoryIndex !== -1) {
                                            const nextIdx = cmdHistoryIndex + 1;
                                            if (nextIdx < cmdHistoryList.length) {
                                                setCmdHistoryIndex(nextIdx);
                                                setCommandInput(cmdHistoryList[nextIdx]);
                                            } else {
                                                setCmdHistoryIndex(-1);
                                                setCommandInput('');
                                            }
                                        }
                                    }
                                }}
                                placeholder="Tapez une commande (ex: help, whoami, skills, hire)..."
                                autoFocus
                            />
                            <button type="submit" className="terminal-submit-btn">
                                Entrée
                            </button>
                        </form>
                    </div>
                )}

                {/* Footer hint */}
                <div className="palette-footer">
                    <div className="palette-hints">
                        <span><kbd>Esc</kbd> Fermer</span>
                        <span><kbd>Tab</kbd> Changer de mode</span>
                        <span><kbd>Cmd+K</kbd> / <kbd>Ctrl+K</kbd> Raccourci</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
