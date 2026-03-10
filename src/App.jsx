import { useEffect } from 'react';
import data from './data/data.json';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CodeBio from './components/CodeBio';
import SkillCard from './components/SkillCard';
import ProjectCard from './components/ProjectCard';
import EducationCard from './components/EducationCard';
import LanguageCard from './components/LanguageCard';
import ScrollReveal from './components/ScrollReveal';

export default function App() {
    // Mouse glow effect
    useEffect(() => {
        const handler = (e) => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };
        document.addEventListener('mousemove', handler);
        return () => document.removeEventListener('mousemove', handler);
    }, []);

    return (
        <>
            <AnimatedBackground />
            <Navbar />
            <Hero />

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
                <div className="projects-grid">
                    {data.projects.map((project, i) => (
                        <ScrollReveal key={project.title} delay={(i % 3) * 0.12}>
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
        </>
    );
}
