export default function Hero() {
    const handleScroll = (e) => {
        e.preventDefault();
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <div className="hero-content">
                <h1>Lucas Martinati</h1>
                <p className="subtitle">Développeur Créatif &amp; Étudiant Passionné</p>
            </div>
            <a href="#about" className="scroll-indicator" aria-label="Faire défiler vers le contenu" onClick={handleScroll}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
        </section>
    );
}
