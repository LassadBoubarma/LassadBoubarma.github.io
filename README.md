# Lassaad Boubarma Portfolio

Responsive static portfolio inspired by FF7 Rebirth, with original atmospheric artwork. Includes Home, Web, Software & AI, Roblox, About, eight project detail pages and a 404 page.

## Editing

Edit `content.mjs` for project descriptions, `build.mjs` for page templates, and `dist/assets/style.css` or `app.js` for styling and interactions. Run `node build.mjs` to refresh the pages. Preview with `python -m http.server 4173 --bind 127.0.0.1 --directory dist`.

Pages and links work without JavaScript; scripting enhances transitions, the mobile menu, copy-email feedback and scroll reveals. Reduced motion is respected.

## Content notes

RAG, Ooredoo and notebook details were checked against public GitHub source. WorkHive and Unity descriptions come from the CV. Tunisia's stack is unspecified. Roblox descriptions come from the user; Cube Counting is a descriptive label pending official names, links and media. No release status or player numbers are claimed. The CV excludes Roblox as requested. The generated hero is atmospheric artwork, not a project screenshot.

## Hosting

Preserve the Site identity in `.openai/hosting.json`. Updates should reuse the Sites source and deployment workflow, not create a replacement Site.
