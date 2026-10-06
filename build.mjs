import fs from 'node:fs';
import path from 'node:path';
import { profile, projects, gameDevProjects } from './content.mjs';

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, '$1'));
const out = path.join(decodeURIComponent(root), 'dist');
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const allProjects = [...projects, ...gameDevProjects];

const categories = [
  { id: 'web', index: '01', name: 'Web & Mobile', label: 'Web', description: 'Dashboards, booking platforms and tools built around real users.' },
  { id: 'software', index: '02', name: 'Software & AI', label: 'Software & AI', description: 'Document intelligence, utilities and interactive software experiments.' },
  { id: 'gamedev', index: '03', name: 'GameDev', label: 'GameDev', description: 'Gameplay systems, virtual experiences and worlds built to be explored.' },
];

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#080e18"/><path d="M13 48V15h8v26h28v7Z" fill="#e9f5ff"/><path d="M31 15h8v12h12v8H39v13h-8V35H20v-8h11Z" fill="#67c8ff" opacity=".95"/></svg>`;

const logo = `<span class="brand-mark" aria-hidden="true">LB</span><span class="brand-copy"><strong>LASSAAD BOUBARMA</strong><small>PORTFOLIO // 2026</small></span>`;

function header(active = 'home') {
  const items = [
    ['home', '/', 'Home', '00'],
    ['web', '/web/', 'Web', '01'],
    ['software', '/software/', 'Software & AI', '02'],
    ['gamedev', '/gamedev/', 'GameDev', '03'],
    ['about', '/about/', 'About', '04'],
  ];
  return `<header class="site-header"><a class="brand" href="/" aria-label="Lassaad Boubarma home">${logo}</a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation"><span>MENU</span><i aria-hidden="true"></i></button><nav id="primary-navigation" aria-label="Main navigation">${items.map(([id, url, label, index]) => `<a href="${url}" ${active === id ? 'aria-current="page"' : ''}><span class="nav-index">${index}</span><span>${label}</span></a>`).join('')}<a class="nav-contact" href="mailto:${profile.email}"><span class="nav-index">+</span><span>Contact</span></a></nav></header>`;
}

function frameLabel(section, index = '00') {
  return `<div class="frame-label" aria-hidden="true"><span>${index}</span><span>${section}</span><i></i></div>`;
}

function tags(items, className = '') {
  return `<div class="tags ${className}">${items.map(tag => `<span>${esc(tag)}</span>`).join('')}</div>`;
}

function projectCard(item, compact = false) {
  return `<a class="project-card ${compact ? 'compact' : ''}" href="/projects/${item.id}/"><div class="card-scan" aria-hidden="true"></div><div class="card-top"><span class="project-index"><i></i>${item.number}</span><span class="eyebrow">${esc(item.type)}</span></div><div class="card-title"><h3>${esc(item.title)}</h3><span class="card-arrow" aria-hidden="true">↗</span></div><p>${esc(item.summary)}</p><div class="card-bottom">${tags(item.tags.slice(0, 3))}<span class="text-link">Open project</span></div></a>`;
}

function commandRow(item) {
  return `<a class="command-row" href="/projects/${item.id}/"><span class="command-diamond" aria-hidden="true"></span><span class="command-number">${item.number}</span><span class="command-main"><strong>${esc(item.title)}</strong><small>${esc(item.type)}</small></span><span class="command-tech">${esc(item.tags.slice(0, 3).join(' / '))}</span><span class="command-arrow" aria-hidden="true">›</span></a>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-system"><span class="system-dot"></span><div><strong>LB // PORTFOLIO</strong><small>Software engineering · Tunisia</small></div></div><div class="footer-links"><a href="${profile.github}" target="_blank" rel="noopener noreferrer">GitHub</a><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="mailto:${profile.email}">Email</a></div><span class="footer-note">© ${new Date().getFullYear()} · SYSTEM ONLINE</span></footer>`;
}

function layout(title, description, active, main) {
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#080e18"><title>${esc(title)} | Lassaad Boubarma</title><meta name="description" content="${esc(description)}"><link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(favicon)}"><link rel="stylesheet" href="/assets/style.css"><script defer src="/assets/app.js"></script></head><body><a class="skip-link" href="#main">Skip to content</a><div class="hud-grid" aria-hidden="true"></div>${header(active)}<main id="main">${main}</main>${footer()}</body></html>`;
}

function write(route, html) {
  const folder = path.join(out, route);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, 'index.html'), html);
}

const hero = `<section class="hero"><div class="hero-art" aria-hidden="true"></div><div class="hero-orbit orbit-one" aria-hidden="true"></div><div class="hero-orbit orbit-two" aria-hidden="true"></div><div class="hero-shell"><div class="hero-content"><p class="eyebrow hero-eyebrow"><span class="diamond"></span>SOFTWARE ENGINEERING // TUNISIA</p><h1>Lassaad<br><span>Boubarma</span></h1><p class="hero-description">Web applications, AI systems and interactive experiences — engineered with a focus on clarity, performance and exploration.</p><div class="hero-actions"><a class="button primary" href="#selected-work"><span>Explore work</span></a><a class="button secondary" href="/assets/Lassaad_Boubarma_CV.pdf" download><span>Download CV</span></a></div><p class="availability"><span class="status-light"></span>Available for a six-month final-year internship · January–June 2027</p></div><aside class="hero-status" aria-label="Portfolio status"><div class="status-ring"><div><strong>07</strong><span>PROJECTS</span></div></div><div class="status-readout"><span>PROFILE</span><strong>SOFTWARE ENGINEER</strong><small>WEB / AI / GAMEDEV</small></div><div class="status-readout"><span>LOCATION</span><strong>TUNISIA</strong><small>UTC +01</small></div><div class="status-readout accent"><span>STATUS</span><strong>OPEN TO INTERNSHIP</strong><small>JAN — JUN 2027</small></div></aside></div><div class="hero-caption"><span>LB // SYSTEM 01</span><span>DEVELOPMENT / EXPLORATION</span><span>PORTFOLIO 2026</span></div></section>`;

const featured = `<section id="selected-work" class="section command-section">${frameLabel('SELECTED WORK', '01')}<div class="section-heading game-heading"><div><p class="eyebrow">COMMAND MENU</p><h2>Selected projects</h2></div><p>Choose a project to inspect the build, stack and decisions behind it.</p></div><div class="command-panel"><div class="command-panel-head"><span>PROJECT</span><span>STACK</span><span>OPEN</span></div>${[projects[0], projects[1], gameDevProjects[1]].map(commandRow).join('')}</div></section>`;

const collections = `<section class="section categories">${frameLabel('DISCIPLINES', '02')}<div class="section-heading game-heading"><div><p class="eyebrow">FIELD SELECT</p><h2>Choose a discipline</h2></div><p>The same approach: understand the system, then make it useful.</p></div><div class="category-list">${categories.map(category => {
  const count = allProjects.filter(project => project.category === category.id).length;
  return `<a class="category-row" href="/${category.id}/"><span class="category-index">${category.index}</span><span class="category-diamond" aria-hidden="true"></span><div><h3>${esc(category.name)}</h3><p>${esc(category.description)}</p></div><span class="category-count"><strong>${String(count).padStart(2, '0')}</strong><small>PROJECTS</small></span><span class="category-arrow" aria-hidden="true">›</span></a>`;
}).join('')}</div></section>`;

const contact = `<section class="contact-section">${frameLabel('CONTACT', '99')}<div class="contact-copy"><p class="eyebrow">NEXT OBJECTIVE</p><h2>Ready for the next<br><span>good challenge.</span></h2><p>Seeking a six-month final-year project or internship from January to June 2027.</p></div><div class="contact-console"><span class="console-label">COMMUNICATION LINK</span><a class="button primary" href="mailto:${profile.email}"><span>Send email</span></a><button class="copy-email" type="button" data-email="${profile.email}">Copy email address</button><span class="copy-status" role="status" aria-live="polite"></span></div></section>`;

const home = `${hero}${featured}${collections}<section class="section home-about">${frameLabel('PROFILE', '03')}<div><p class="eyebrow">PLAYER PROFILE</p><h2>Engineering student.<br>Always exploring.</h2></div><div class="about-summary"><p>I’m a software engineering student at MedTech, South Mediterranean University. My work moves between useful applications and interactive experiences, with a growing focus on AI.</p><a class="text-link" href="/about/">Open full profile</a></div></section>${contact}`;
write('', layout('Software Engineering Portfolio', 'Web applications, AI tools and interactive experiences by Lassaad Boubarma, a software engineering student based in Tunisia.', 'home', home));

for (const category of categories) {
  const items = allProjects.filter(project => project.category === category.id);
  const intro = {
    web: 'Interfaces and applications that make complex workflows feel straightforward.',
    software: 'Systems that retrieve, organise, analyse and bring information to life.',
    gamedev: 'Gameplay systems and interactive worlds built around feedback, progression and exploration.',
  }[category.id];

  const content = `<section class="page-intro collection-intro">${frameLabel('COLLECTION', category.index)}<a class="back-link" href="/"><span>‹</span> Home</a><div class="page-intro-line"><p class="eyebrow">PROJECT COLLECTION // ${category.index}</p><span class="eyebrow">${String(items.length).padStart(2, '0')} PROJECTS</span></div><h1>${esc(category.name)}</h1><p>${esc(intro)}</p><div class="collection-status"><span>SECTION ${category.index}</span><i></i><span>${esc(category.label.toUpperCase())}</span></div></section><section class="section gallery-section" aria-label="${esc(category.name)} projects"><div class="project-gallery">${items.map(project => projectCard(project)).join('')}</div></section>${contact}`;
  write(category.id, layout(category.name, category.description, category.id, content));
}

for (const project of allProjects) {
  const category = categories.find(item => item.id === project.category);
  const related = allProjects.filter(item => item.category === project.category && item.id !== project.id).slice(0, 2);
  const detail = `<section class="page-intro detail-intro">${frameLabel('PROJECT DATA', project.number)}<a class="back-link" href="/${project.category}/"><span>‹</span> All ${esc(category.label)} projects</a><div class="detail-title-row"><div><p class="eyebrow">${esc(project.type)}</p><h1>${esc(project.title)}</h1><p>${esc(project.summary)}</p>${tags(project.tags, 'large-tags')}</div><div class="project-gauge" aria-label="Project ${project.number}"><span>PROJECT</span><strong>${project.number}</strong><small>${esc(category.label.toUpperCase())}</small></div></div></section><section class="section project-overview">${frameLabel('OVERVIEW', 'A')}<div class="overview-main"><p class="eyebrow">MISSION BRIEF</p><h2>${esc(project.fullTitle)}</h2><p class="lead">${esc(project.description)}</p><div class="build-note"><span>WHAT I BUILT</span><p>${esc(project.contribution)}</p></div>${project.note ? `<p class="project-note"><span>NOTE</span>${esc(project.note)}</p>` : ''}</div><aside class="project-facts"><div class="fact-heading">SYSTEM DATA</div><div><span class="eyebrow">CONTEXT</span><p>${esc(project.context)}</p></div><div><span class="eyebrow">BUILT WITH</span>${tags(project.tags)}</div>${project.repo ? `<a class="button secondary full" href="${project.repo}" target="_blank" rel="noopener noreferrer"><span>View source on GitHub</span></a>` : `<a class="button secondary full" href="mailto:${profile.email}?subject=${encodeURIComponent('About ' + project.title)}"><span>Ask about this project</span></a>`}</aside></section><section class="section features-section">${frameLabel('SYSTEM FLOW', 'B')}<div class="section-heading game-heading"><div><p class="eyebrow">INSIDE THE EXPERIENCE</p><h2>How it comes together</h2></div></div><ol class="flow-list" aria-label="Project workflow">${project.flow.map((step, index) => `<li><span class="flow-node"><i>${String(index + 1).padStart(2, '0')}</i></span><strong>${esc(step)}</strong></li>`).join('')}</ol><div class="feature-grid">${project.features.map(([title, description], index) => `<article><span class="feature-index">0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(description)}</p></article>`).join('')}</div></section><section class="section related-section">${frameLabel('RELATED', 'C')}<div class="section-heading game-heading"><div><p class="eyebrow">KEEP EXPLORING</p><h2>More in ${esc(category.label)}</h2></div><a class="text-link" href="/${category.id}/">View collection</a></div><div class="project-gallery related-grid">${related.map(item => projectCard(item, true)).join('')}</div></section>${contact}`;
  write(`projects/${project.id}`, layout(project.title, project.description, project.category, detail));
}

const about = `<section class="page-intro about-intro">${frameLabel('PROFILE', '04')}<a class="back-link" href="/"><span>‹</span> Home</a><div class="page-intro-line"><p class="eyebrow">PLAYER PROFILE // LASSAAD BOUBARMA</p><span class="eyebrow">SOFTWARE ENGINEERING</span></div><h1>Curiosity meets<br><span>engineering.</span></h1><p>I’m Lassaad, a software engineering student based in Tunisia.</p></section><section class="section profile-panel">${frameLabel('PROFILE DATA', 'A')}<div class="profile-gauge"><div class="profile-ring"><strong>27</strong><span>GRAD<br>2027</span></div><p>Software Engineering<br><span>MedTech · SMU</span></p></div><div class="about-story"><p>I study software engineering at MedTech, South Mediterranean University, and expect to graduate in June 2027. I build web and mobile applications, AI tools, and interactive experiences and games in Unity and Luau.</p><p>My projects often start with a practical need: finding answers in documents, making spreadsheets easier to use, organising study notes, or building interactive game systems. Game development gives me another space to experiment with interaction, progression and world-building.</p><p>Through internships at Ooredoo and FORVIA, I have gained experience in software development and automated testing. I’m looking for a six-month final-year project or internship from January to June 2027.</p><a class="button secondary" href="/assets/Lassaad_Boubarma_CV.pdf" download><span>Download my CV</span></a></div></section><section class="section experience-section">${frameLabel('EXPERIENCE', 'B')}<div class="section-heading game-heading"><div><p class="eyebrow">TIMELINE</p><h2>Learning through building</h2></div></div><div class="experience-list"><div class="experience-row"><span class="experience-date">JUN—AUG 2025</span><span class="experience-node"></span><div><h3>Software Development Intern</h3><p class="experience-company">Ooredoo Tunisia</p><p>Built a React and Spring Boot dashboard for spreadsheet exploration, filtering and PDF reporting.</p><a class="text-link" href="/projects/ooredoo-dashboard/">Explore the project</a></div></div><div class="experience-row"><span class="experience-date">JUL 2023 · 3 WEEKS</span><span class="experience-node"></span><div><h3>Software Testing Intern</h3><p class="experience-company">FORVIA Tunisia</p><p>Wrote and executed Selenium tests, developed C testing utilities, and documented validation results.</p></div></div><div class="experience-row"><span class="experience-date">EXPECTED JUN 2027</span><span class="experience-node"></span><div><h3>Software Engineering</h3><p class="experience-company">MedTech · South Mediterranean University</p></div></div></div></section><section class="section skill-section">${frameLabel('LOADOUT', 'C')}<div class="section-heading game-heading"><div><p class="eyebrow">TOOLKIT</p><h2>Current loadout</h2></div></div><div class="skill-grid">${[['Languages', 'Python · Java · C · JavaScript · TypeScript · SQL · Luau'], ['Web & mobile', 'React · React Native · Vue.js · Express.js · Spring Boot'], ['AI & data', 'RAG · SentenceTransformers · Ollama · Streamlit · Firebase · Supabase'], ['GameDev & testing', 'Unity · Luau · Git · Selenium · Postman']].map(([title, value], index) => `<div><span class="skill-index">0${index + 1}</span><h3>${esc(title)}</h3><p>${esc(value)}</p></div>`).join('')}</div></section>${contact}`;
write('about', layout('About', 'Get to know Lassaad Boubarma: software engineering student, AI and web developer, and game creator based in Tunisia.', 'about', about));


fs.writeFileSync(path.join(out, '404.html'), layout('Page not found', 'This page could not be found.', '', `<section class="page-intro error-intro">${frameLabel('ERROR', '404')}<p class="eyebrow">NAVIGATION ERROR // 404</p><h1>A different path.</h1><p>The page you are looking for is not here.</p><a class="button primary" href="/"><span>Return to portfolio</span></a></section>`));
console.log('Portfolio HTML generated.');
