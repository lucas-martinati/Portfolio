export default function Navbar() {
    const handleClick = (e, targetId) => {
        e.preventDefault();
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <header>
            <nav>
                <div className="logo">LM_DEV</div>
                <ul className="nav-links">
                    <li><a href="#about" onClick={(e) => handleClick(e, 'about')}>À propos</a></li>
                    <li><a href="#projects" onClick={(e) => handleClick(e, 'projects')}>Projets</a></li>
                    <li><a href="#education" onClick={(e) => handleClick(e, 'education')}>Parcours</a></li>
                </ul>
            </nav>
        </header>
    );
}
