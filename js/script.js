// Smooth scrolling sécurisé (ignore href="#" et ancres manquantes)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = this.getAttribute('href');
        const isHash = target && target.startsWith('#') && target.length > 1;
        if (!isHash) return; // laisser le comportement par défaut (ex: href="#")
        const el = document.querySelector(target);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
    });
});

// Effet souris uniquement sur le fond (mouse-glow)
const root = document.documentElement;
document.addEventListener('mousemove', (e) => {
    root.style.setProperty('--mouse-x', `${e.clientX}px`);
    root.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Animation d'entrée
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(entry.target); // Ne jouer l'animation qu'une seule fois
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
document.querySelectorAll('.skill-card, .project-item, .code-bio, .education-item, .language-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.98)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
});


// Animation spéciale pour les projets
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.2}s`;
});

// Animation typewriter pour le code
const codeLines = document.querySelectorAll('.code-line');
codeLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.2}s`;
});

// Parallax supprimé (conflit avec l'animation CSS des formes)

// Effet hover 3D pour les cartes projet
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        let percentX = (x - centerX) / centerX;
        let percentY = (y - centerY) / centerY;
        const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
        percentX = clamp(percentX, -1, 1);
        percentY = clamp(percentY, -1, 1);
        const maxTilt = 4; // Subtler tilt for glassmorphism
        const rotateX = -(percentY * maxTilt);
        const rotateY = percentX * maxTilt;

        card.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.zIndex = "10";
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(2000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.zIndex = "1";
    });
});

// (Formulaire supprimé du HTML) — gestionnaire retiré