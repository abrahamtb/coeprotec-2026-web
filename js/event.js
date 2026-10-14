const menuButton = document.getElementById('menu-button');
const mainNav = document.getElementById('main-nav');

if (menuButton && mainNav) {
  const closeMenu = () => {
    mainNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };
  window.toggleMenu = () => {
    const open = mainNav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}

const events = Array.isArray(window.COEPROTEC_EVENTS) ? window.COEPROTEC_EVENTS : [];
const today = new Date();
today.setHours(0, 0, 0, 0);
const upcoming = events.filter(item => {
  if (!item || !/^\d{4}-\d{2}-\d{2}$/.test(item.date || '')) return false;
  const date = new Date(`${item.date}T12:00:00`);
  return !Number.isNaN(date.valueOf()) && date >= today && item.title && item.summary;
}).sort((a, b) => a.date.localeCompare(b.date));

const homeAgenda = document.getElementById('agenda-home-content');
if (homeAgenda && upcoming.length) {
  const next = upcoming[0];
  const date = new Date(`${next.date}T12:00:00`);
  homeAgenda.replaceChildren();
  const kicker = document.createElement('span');
  kicker.className = 'agenda-next-date';
  kicker.textContent = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const title = document.createElement('h3');
  title.textContent = next.title;
  const summary = document.createElement('p');
  summary.textContent = next.summary;
  const link = document.createElement('a');
  link.className = 'text-link light';
  link.href = 'inscripciones.html';
  link.textContent = 'Ver agenda y detalles ↗';
  homeAgenda.append(kicker, title, summary, link);
}

const eventsList = document.getElementById('events-list');
if (eventsList) {
  if (upcoming.length) {
    eventsList.replaceChildren();
    upcoming.forEach(item => {
      const card = document.createElement('article');
      card.className = 'event-card';
      const date = new Date(`${item.date}T12:00:00`);
      const dateText = new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
      const dateBox = document.createElement('div');
      dateBox.className = 'event-date';
      const day = document.createElement('strong');
      day.textContent = new Intl.DateTimeFormat('es-PE', { day: '2-digit' }).format(date);
      const month = document.createElement('span');
      month.textContent = new Intl.DateTimeFormat('es-PE', { month: 'short' }).format(date).toUpperCase();
      dateBox.append(day, month);
      const content = document.createElement('div');
      content.className = 'event-content';
      const meta = document.createElement('p');
      meta.className = 'event-meta';
      meta.textContent = [dateText, item.time, item.mode, item.venue].filter(Boolean).join(' · ');
      const title = document.createElement('h3');
      title.textContent = item.title;
      const summary = document.createElement('p');
      summary.textContent = item.summary;
      content.append(meta, title, summary);
      if (item.detailsUrl && /^(?:\.\/)?[a-z0-9/_?=&%.-]+$/i.test(item.detailsUrl)) {
        const link = document.createElement('a');
        link.className = 'text-link';
        link.href = item.detailsUrl;
        link.textContent = item.status === 'open' ? 'Ver inscripción y detalles ↗' : 'Ver detalles ↗';
        content.append(link);
      } else {
        const note = document.createElement('span');
        note.className = 'event-status';
        note.textContent = item.status === 'closed' ? 'Inscripción cerrada' : 'Próximamente más detalles';
        content.append(note);
      }
      card.append(dateBox, content);
      eventsList.append(card);
    });
  }
}
