# Lassaad Boubarma Portfolio

Responsive static portfolio with an original sci-fi interface inspired by the translucent menus, radial status displays and blue selection states of Final Fantasy VII Rebirth. The site uses original artwork and CSS UI motifs; it does not copy game assets.

Includes Home, Web, Software & AI, GameDev, About, eight project detail pages and a 404 page. The game-development section is available at `/gamedev/`.

## Editing

- Edit `content.mjs` for project descriptions and profile links.
- Edit `build.mjs` for page templates and navigation.
- Edit `dist/assets/style.css` for the visual system.
- Edit `dist/assets/app.js` for navigation, copy-email feedback, mobile menu and reveal effects.
- Run `node build.mjs` after content or template changes.
- Preview with `python -m http.server 4173 --bind 127.0.0.1 --directory dist`.

Pages and links work without JavaScript; scripting enhances transitions, the mobile menu, copy-email feedback and scroll reveals. Reduced motion is respected.

## Content notes

RAG, Ooredoo and notebook details were checked against public GitHub source in the earlier project pass. WorkHive and Unity descriptions come from the CV. GameDev descriptions come from the user. Cube Counting and Isekai Adventure are descriptive labels pending official names, links and media. No release status or player numbers are claimed. The CV remains separate from the GameDev section.

## Hosting

Preserve the Site identity in `.openai/hosting.json`. Updates should reuse the existing Sites source and deployment workflow rather than creating a replacement Site.


# Build note
This package is the FF7-Rebirth-inspired version. Navigation includes GameDev.
