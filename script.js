// Simple SPA router: uses hash (#/home) to switch content.
// Two modes:
//  - Hash router (default): uses inline <template> tags in index.html
//  - Fetch router (commented): loads separate HTML fragments from /pages/ (requires a server)

// ROUTES map route path -> template id OR file path (for fetch-router).
const routes = {
  '/home': { type: 'tpl', id: 'tpl-home' },
  '/research': { type: 'tpl', id: 'tpl-research' },
  '/people': { type: 'tpl', id: 'tpl-people' },
  '/publications': { type: 'tpl', id: 'tpl-publications' },
  '/teaching': { type: 'tpl', id: 'tpl-teaching' },
  '/cv': { type: 'tpl', id: 'tpl-cv' },
  '/links': { type: 'tpl', id: 'tpl-links' }
};

// --- Helper: current path from location.hash
function currentPath() {
  const h = location.hash || '#/home';
  return h.slice(1).replace(/\/$/, ''); // strip '#'
}

// --- Render function for template-based hash router
function renderTemplateRoute(path) {
  const route = routes[path] || routes['/home'];
  if (route.type !== 'tpl') {
    document.getElementById('page-content').innerHTML = '<p>Invalid route</p>';
    return;
  }
  const tpl = document.getElementById(route.id);
  if (!tpl) {
    document.getElementById('page-content').innerHTML = '<p>Page template missing</p>';
    return;
  }
  const target = document.getElementById('page-content');
  target.innerHTML = '';
  target.appendChild(tpl.content.cloneNode(true));
  // Update title from first heading
  const heading = target.querySelector('h1, h2');
  document.title = 'Sourav Kumar - '+ (heading ? heading.innerText : 'Profile') ;
}

// --- (Alternative) Fetch-based router: load HTML fragment from /pages/<name>.html
// Uncomment and adapt if you want separate files and are serving via HTTP server.
//
// async function renderFetchRoute(path) {
//   const name = path.replace(/^\//, '') || 'home';
//   const url = `/pages/${name}.html`; // place your fragments in /pages/
//   try {
//     const res = await fetch(url);
//     if (!res.ok) throw new Error('Not found');
//     const html = await res.text();
//     document.getElementById('page-content').innerHTML = html;
//     const heading = document.getElementById('page-content').querySelector('h1,h2');
//     document.title = (heading ? heading.innerText : 'Profile') + ' — Lian Xue';
//   } catch (err) {
//     document.getElementById('page-content').innerHTML = '<p>Page not found.</p>';
//   }
// }

// --- Router entry
function onNav() {
  const path = currentPath();
  renderTemplateRoute(path);
  // If using fetch-router: uncomment below and comment the renderTemplateRoute call above:
  // renderFetchRoute(path);
}

window.addEventListener('hashchange', onNav);
window.addEventListener('load', onNav);

// Optional: keyboard shortcut example
window.addEventListener('keydown', (e) => {
  if (e.key === '/') {
    e.preventDefault();
    location.hash = '#/research';
  }
});
