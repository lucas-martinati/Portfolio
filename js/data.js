// Données dynamiques et rendu DOM
// Les éléments sont injectés avant l'exécution de js/script.js (chargé ensuite dans index.html)

// ——— À propos (code-bio) ———
const developer = {
  name: 'Lucas Martinati',
  status: 'Étudiant en BUT Informatique',
  passion: 'Évoluer dans le domaine de l\'informatique',
  skills: ['JavaScript', 'Python', 'React', 'Next.js', 'TypeScript', 'HTML/CSS', 'Bash', 'Firebase'],
  mindset: 'Organisé, rigoureux et proactif',
  currentFocus: 'BUT Informatique — IUT Nancy-Charlemagne',
  availability: true,
  email: 'lucasm54800@gmail.com',
  comment: 'Prêt à collaborer sur des projets innovants !'
};

function renderCodeBio(dev) {
  const el = document.getElementById('code-content');
  if (!el) return;

  const pad2 = (n) => String(n).padStart(2, '0');
  const str = (s) => `<span class="string">'${s}'</span>`;
  const prop = (p) => `<span class="property">${p}</span>`;
  const val = (v) => `<span class="value">${v}</span>`;
  const arr = (list) => `[${list.map((it) => str(it)).join(', ')}]`;

  const lines = [
    `<span class="keyword">const</span> ${prop('developer')} = {`,
    `&nbsp;&nbsp;${prop('name')}: ${str(dev.name)},`,
    `&nbsp;&nbsp;${prop('status')}: ${str(dev.status)},`,
    `&nbsp;&nbsp;${prop('passion')}: ${str(dev.passion)},`,
    `&nbsp;&nbsp;${prop('skills')}: ${arr(dev.skills)},`,
    `&nbsp;&nbsp;${prop('mindset')}: ${str(dev.mindset)},`,
    `&nbsp;&nbsp;${prop('currentFocus')}: ${str(dev.currentFocus)},`,
    `&nbsp;&nbsp;${prop('availability')}: ${val(dev.availability)},`,
    `&nbsp;&nbsp;${prop('email')}: ${str(dev.email)}`,
    `};`,
    ``,
    `<span class="comment">// ${dev.comment}</span>`
  ];

  el.innerHTML = lines
    .map((content, i) => `
      <div class="code-line">
        <span class="line-number">${pad2(i + 1)}</span>
        ${content}
      </div>`)
    .join('');
}

// ——— Compétences ———
const skills = [
  {
    icon: '🌐',
    title: 'Développement Web',
    description: "Création d'applications web modernes et performantes avec React, Next.js, HTML, CSS et JavaScript.",
    tags: ['React', 'Next.js', 'HTML/CSS', 'TypeScript']
  },
  {
    icon: '📱',
    title: 'Applications',
    description: "Développement mobile (Capacitor) et extensions pour navigateurs et éditeurs.",
    tags: ['Capacitor', 'Chrome Extensions', 'VSCode']
  },
  {
    icon: '🐍',
    title: 'Python & Scripts',
    description: "Automatisation, applications de bureau PyQt5 et langages de script.",
    tags: ['Python', 'PyQt5', 'Bash']
  },
  {
    icon: '🗄️',
    title: 'Bases de Données & Cloud',
    description: "Conception de backend serverless, bases de données en temps réel et intégration d'API.",
    tags: ['Firebase', 'API REST', 'JSON']
  },
  {
    icon: '🧠',
    title: 'Logique & Algorithmes',
    description: "Bon raisonnement mathématique, conception UML/MCD et écriture de pseudo-code.",
    tags: ['Algorithmique', 'UML', 'MCD']
  },
  {
    icon: '🔧',
    title: 'DevOps & Système',
    description: "Administration système Linux, scripts Bash, Systemd et automatisation de déploiement.",
    tags: ['Linux', 'Systemd', 'Git']
  }
];

// ——— Projets ———
const projects = [
  {
    image: '🔥',
    year: '2025',
    status: { label: 'En cours', className: 'status-in-progress' },
    title: 'OneUp',
    description: "OneUp est un défi fitness quotidien sur 365 jours. Chaque jour, le nombre de répétitions augmente progressivement sur 6 exercices. L'objectif ? Tenir toute l'année.",
    tags: ['React', 'Vite', 'Capacitor', 'Firebase'],
    link: { href: 'https://lucas-martinati.github.io/OneUp/', text: 'Voir le projet' }
  },
  {
    image: '💎',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Stones Collection',
    description: "Site pour stocker la liste des pierres que ma copine possède.",
    tags: ['html', 'css', 'js', "base de données", "API"],
    link: { href: 'https://stones-collection.netlify.app/', text: 'Voir le site' }
  },
  {
    image: '🃏',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Mao',
    description: "Application web développée avec Next.js et TypeScript.",
    tags: ['Next.js', 'TypeScript'],
    link: { href: 'https://mao-game.netlify.app', text: 'Voir le site' }
  },
  {
    image: '🗂️',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Nautilus Taildrop',
    description: "Extension Nautilus (le navigateur de fichiers GNOME) qui intègre Taildrop, ajoutant une option au menu contextuel pour envoyer et recevoir des fichiers facilement.",
    tags: ['Python', 'Linux', 'GNOME'],
    link: { href: 'https://github.com/lucas-martinati/nautilus-taildrop', text: 'Voir le Repository' }
  },
  {
    image: '🤖',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'L-GPT',
    description: "Une application full-stack Next.js qui imite l'interface de ChatGPT.",
    tags: ['Next.js', 'Firebase', 'TypeScript'],
    link: { href: 'https://l-gpt.netlify.app/', text: 'Voir le site' }
  },
  {
    image: '📝',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Pseudo-Code Language Support (VSCode)',
    description: "Extension Visual Studio Code transformant l'éditeur en IDE complet pour l'écriture et l'exécution de pseudo-code algorithmique en français.",
    tags: ['VSCode Extension', 'TypeScript'],
    link: { href: 'https://marketplace.visualstudio.com/items?itemName=LucasM54.PseudoCode-Interpreter', text: 'VS Marketplace' }
  },
  {
    image: '📊',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'UML Generator',
    description: "Un outil simple et puissant pour créer des diagrammes MCD (Modèle Conceptuel de Données) directement dans le navigateur avec support d'exportation.",
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    link: { href: 'https://github.com/lucas-martinati/UML-Generator', text: 'Voir le Repository' }
  },
  {
    image: '✨',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Gemini Ultimate Extension',
    description: "Une extension Chrome puissante pour automatiser et améliorer l'expérience sur Google Gemini (sélection rapide du modèle et envois automatiques).",
    tags: ['Chrome Extension', 'JavaScript'],
    link: { href: 'https://chromewebstore.google.com/detail/gemini-ultimate/jhpkldiddcobahfolmjiobbacjbgdegl', text: 'Chrome Web Store' }
  },
  {
    image: '🎮',
    imageUrl: 'img/Report with WintrChess cover.png',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Report with WintrChess',
    description: "Transférez facilement vos parties d’échecs depuis Lichess et Chess.com vers WintrChess pour une analyse approfondie. Disponible sous forme d'extension Chrome.",
    tags: ['Chrome extension', 'js'],
    link: { href: 'https://chromewebstore.google.com/detail/free-analyze-with-wintrch/ljjbgidgpkhjenpgpjfjidfflnelmpan', text: 'Chrome web store' }
  },
  {
    image: '🐧',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'SysAdmin 101',
    description: "Plateforme web interactive conçue pour l'apprentissage de l'administration système Linux avec un terminal simulé et de l'auto-validation.",
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    link: { href: 'https://github.com/LucasM548/SysAdmin', text: 'Voir le Repository' }
  },
  {
    image: '🖥️',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'SAE-S1-3 (Administration Système)',
    description: "Dépôt des scripts d'administration système, configurations Systemd/Logrotate et notice technique pour Ubuntu 22.04.",
    tags: ['Bash', 'Linux', 'Systemd'],
    link: { href: 'https://github.com/lucas-martinati/SAE-S1-3', text: 'Voir le Repository' }
  },
  {
    image: '💳',
    imageUrl: 'img/Flashcards cover.png',
    year: '2025',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Flashcards de Première & Terminale',
    description: "Site de vente de nos flashcards réalisés en premières et en terminales.",
    tags: ['html', 'css', 'js', 'API', 'PayPal'],
    link: { href: 'https://lucasm548.github.io/Flashcard/', text: 'Voir le site' }
  },
  {
    image: '🌍',
    year: '2024',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Can-Vert',
    description: "Site internet développé dans le cadre d'un projet.",
    tags: ['HTML', 'CSS'],
    link: { href: 'https://lucas-martinati.github.io/Can-Vert/', text: 'Voir le site' }
  },
  {
    image: '📥',
    imageUrl: 'img/Applications Automatical Installer cover.png',
    year: '2024',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Applications Automatical Installer',
    description: "Permet l’installation automatique des applications sélectionnées.",
    tags: ['Python', 'PyQt5', 'requests', 'json'],
    link: { href: 'https://github.com/LucasM548/Applications_Automatical_Installer', text: 'Voir le Repository' }
  },
  {
    image: '🍐',
    imageUrl: 'img/Pear Search cover.png',
    year: '2023',
    status: { label: 'Terminé', className: 'status-completed' },
    title: 'Pear Search',
    description: "Le meilleur moteur de recherche de tous les temps, il vous permettra de trouver ce que vous cherchez tout en vous laissant flâner sur le web. Vous pouvez oublier vos données personnelles, qui seront stockées directement sur nos serveurs pour vous simplifier la vie.",
    tags: ['html', 'css', 'js'],
    link: { href: 'https://lucasm548.github.io/Pear-Search/', text: 'Voir le site' }
  }
];

// ——— Rendu ———
function renderSkills(list) {
  const container = document.getElementById('skills-container');
  if (!container) return;
  container.innerHTML = list
    .map(
      (s) => `
      <div class="skill-card">
        <div class="skill-header">
          <div class="skill-icon">${s.icon}</div>
          <div class="skill-title">${s.title}</div>
        </div>
        <p class="skill-description">${s.description}</p>
        <div class="skill-tags">
          ${s.tags.map((t) => `<span class="skill-tag">${t}</span>`).join('')}
        </div>
      </div>`
    )
    .join('');
}

function renderProjects(list) {
  const container = document.getElementById('projects-timeline');
  if (!container) return;
  container.innerHTML = list
    .map(
      (p) => `
      <div class="project-item">
        <div class="project-card">
          <div class="project-image ${p.imageUrl ? 'has-cover' : ''}">${p.imageUrl ? '<img src="' + p.imageUrl + '" alt="' + p.title + '" class="project-cover">' : (p.image || '')}</div>
          <div class="project-content">
            <div class="project-meta">
              <span class="project-year">${p.year}</span>
              <span class="project-status ${p.status.className}">${p.status.label}</span>
            </div>
            <h3 class="project-title">${p.title}</h3>
            <p class="project-description">${p.description}</p>
            <div class="project-footer">
              <div class="project-tags">
                ${p.tags.map((t) => `<span class="tag">${t}</span>`).join('')}
              </div>
              ${p.link ? `<a href="${p.link.href}" class="project-link" target="_blank" rel="noopener noreferrer">${p.link.text}</a>` : ''}
            </div>
          </div>
        </div>
      </div>`
    )
    .join('');
}

// ——— Éducation & Expérience ———
const education = [
  {
    period: '2025 - 2028',
    title: 'BUT Informatique',
    school: 'IUT Nancy-Charlemagne, Université de Lorraine'
  },
  {
    period: '2025',
    title: 'BAC Général Mention Bien',
    school: 'Lycée Jean Zay — Maths/Physique chimie/Math expert'
  },
  {
    period: '2022',
    title: 'Stagiaire, Chef de rayon',
    school: 'Intermarché, Jarny (Facing & Gestion du stock)'
  },
  {
    period: '2022',
    title: 'Brevet Mention Bien',
    school: 'Collège Alfred Mézières, Jarny'
  },
  {
    period: '2022',
    title: 'Certification PIX',
    school: 'Score de 321 PIX en 3ème'
  }
];

function renderEducation(list) {
  const container = document.getElementById('education-timeline');
  if (!container) return;
  container.innerHTML = list
    .map(
      (item) => `
      <div class="education-item">
        <div class="education-card">
          <div class="education-period">${item.period}</div>
          <div class="education-content">
            <h3 class="education-title">${item.title}</h3>
            <p class="education-school">${item.school}</p>
          </div>
        </div>
      </div>`
    )
    .join('');
}

// ——— Langues ———
const languages = [
  { name: 'Français', level: 'Natif', icon: '🇫🇷' },
  { name: 'Anglais', level: 'Compétence professionnelle', icon: '🇬🇧' }
];

function renderLanguages(list) {
  const container = document.getElementById('languages-container');
  if (!container) return;
  container.innerHTML = list
    .map(
      (lang) => `
      <div class="language-card">
        <div class="language-icon">${lang.icon}</div>
        <div class="language-info">
          <h3 class="language-name">${lang.name}</h3>
          <p class="language-level">${lang.level}</p>
        </div>
      </div>`
    )
    .join('');
}

// Rendus
renderCodeBio(developer);
renderSkills(skills);
renderProjects(projects);
renderEducation(education);
renderLanguages(languages);
