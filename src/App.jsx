import { useState, useMemo, useEffect } from 'react';
import data from './data/data.json';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CodeBio from './components/CodeBio';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import EducationCard from './components/EducationCard';
import LanguageCard from './components/LanguageCard';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';

function getProjectCategory(project) {
    if (project.category) return project.category;
    const tagsLower = (project.tags || []).map((t) => t.toLowerCase());
    if (tagsLower.some((t) => t.includes('extension') || t.includes('chrome') || t.includes('vscode'))) {
        return 'extension';
    }
    if (tagsLower.some((t) => t.includes('linux') || t.includes('systemd') || t.includes('bash') || t.includes('pyqt5'))) {
        return 'system';
    }
    return 'web';
}

export default function App() {
    const [activeCategory, setActiveCategory] = useState('all');

    // Mouse glow effect
    useEffect(() => {
        const handler = (e) => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        document.addEventListener('mousemove', handler);
        return () => document.removeEventListener('mousemove', handler);
    }, []);

    const counts = useMemo(() => {
        const res = { all: data.projects.length, web: 0, extension: 0, system: 0 };
        data.projects.forEach((p) => {
            const cat = getProjectCategory(p);
            if (res[cat] !== undefined) res[cat]++;
        });
        return res;
    }, []);

    const filteredProjects = useMemo(() => {
        if (activeCategory === 'all') return data.projects;
        return data.projects.filter((p) => getProjectCategory(p) === activeCategory);
    }, [activeCategory]);

    return (
        <>
            <AnimatedBackground />
            <Navbar developer={data.developer} />
            <Hero developer={data.developer} />

            {/* À propos */}
            <section className="about" id="about">
                <h2 className="section-title">À propos</h2>
                <ScrollReveal>
                    <CodeBio developer={data.developer} />
                </ScrollReveal>
                <div className="skills-container">
                    {data.skills.map((skill, i) => (
                        <ScrollReveal key={skill.title} delay={i * 0.1}>
                            <SkillCard skill={skill} />
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Projets */}
            <section className="projects" id="projects">
                <h2 className="section-title">Mes Projets</h2>

                {/* Filtres de catégories */}
                <div className="project-filters">
                    <button
                        type="button"
                        className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                    >
                        <span>Tous</span>
                        <span className="filter-count">{counts.all}</span>
                    </button>
                    <button
                        type="button"
                        className={`filter-btn ${activeCategory === 'web' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('web')}
                    >
                        <span>Web &amp; Full-Stack</span>
                        <span className="filter-count">{counts.web}</span>
                    </button>
                    <button
                        type="button"
                        className={`filter-btn ${activeCategory === 'extension' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('extension')}
                    >
                        <span>Extensions</span>
                        <span className="filter-count">{counts.extension}</span>
                    </button>
                    <button
                        type="button"
                        className={`filter-btn ${activeCategory === 'system' ? 'active' : ''}`}
                        onClick={() => setActiveCategory('system')}
                    >
                        <span>Système &amp; Scripts</span>
                        <span className="filter-count">{counts.system}</span>
                    </button>
                </div>

                <div className="projects-grid">
                    {filteredProjects.map((project, i) => (
                        <ScrollReveal key={project.title} delay={(i % 3) * 0.1}>
                            <ProjectCard project={project} index={i} />
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Parcours */}
            <section className="education" id="education">
                <h2 className="section-title">Mon Parcours</h2>
                <div className="education-timeline">
                    {data.education.map((item, i) => (
                        <ScrollReveal key={item.title} delay={i * 0.1}>
                            <EducationCard item={item} />
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Langues */}
            <section className="languages" id="languages">
                <h2 className="section-title">Langues</h2>
                <div className="languages-container">
                    {data.languages.map((lang, i) => (
                        <ScrollReveal key={lang.name} delay={i * 0.15}>
                            <LanguageCard language={lang} />
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Contact & Réseaux */}
            <ScrollReveal>
                <Footer developer={data.developer} />
            </ScrollReveal>
        </>
    );
}
