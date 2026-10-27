/* Canales oficiales de COEPROTEC. Agregar únicamente URLs confirmadas por gerencia.
   Ningún enlace se muestra mientras su URL esté vacía. */
(() => {
  const channels = [
    { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61595371786875', host: 'facebook.com' },
    { name: 'Instagram', url: 'https://www.instagram.com/coeprotec/?hl=es', host: 'instagram.com' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@coeprotec_27', host: 'tiktok.com' },
    { name: 'X', url: '', host: 'x.com' },
    { name: 'YouTube', url: 'https://www.youtube.com/@Coeprotec', host: 'youtube.com' }
  ];
  const allowed = channels.filter(item => {
    if (!item.url) return false;
    try {
      const url = new URL(item.url);
      return url.protocol === 'https:' &&
        (url.hostname === item.host || url.hostname === 'www.' + item.host);
    } catch { return false; }
  });
  if (!allowed.length) return;
  for (const footer of document.querySelectorAll('.footer-grid')) {
    const panel = document.createElement('div');
    panel.className = 'official-socials';
    const title = document.createElement('span');
    title.textContent = 'REDES OFICIALES';
    panel.append(title);
    for (const item of allowed) {
      const a = document.createElement('a');
      a.href = item.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = item.name;
      a.setAttribute('aria-label', 'COEPROTEC en ' + item.name);
      panel.append(a);
    }
    footer.append(panel);
  }
})();
