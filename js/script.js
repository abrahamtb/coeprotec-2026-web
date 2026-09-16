(() => {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];
  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuToggle.classList.toggle('open', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('menu-open', open);
    });
  }
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .10 });
  $$('.reveal').forEach(el => revealObserver.observe(el));
  const backTop = $('#backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', scrollY > 650);
    });
    backTop.addEventListener('click', () => scrollTo({top:0, behavior:'smooth'}));
  }
  const toast = $('#toast');
  window.showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };
  const speakerFilters = $('[data-speaker-filters]');
  if (speakerFilters) {
    const cards = $$('.speaker-card');
    speakerFilters.addEventListener('click', e => {
      const btn = e.target.closest('[data-topic]');
      if (!btn) return;
      $$('.chip', speakerFilters).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const topic = btn.dataset.topic;
      cards.forEach(card => card.classList.toggle('hidden', topic !== 'all' && card.dataset.topic !== topic));
    });
  }
  const programTabs = $('[data-program-tabs]');
  if (programTabs) {
    const rows = $$('.agenda-row');
    programTabs.addEventListener('click', e => {
      const btn = e.target.closest('[data-program]');
      if (!btn) return;
      $$('.program-tab', programTabs).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.program;
      rows.forEach(row => row.classList.toggle('hidden', type !== 'all' && row.dataset.type !== type));
    });
  }
  $$('[data-demo-download]').forEach(btn => btn.addEventListener('click', () => showToast('El PDF oficial se conectará cuando el programa sea aprobado.')));
  const registrationForm = $('#registrationForm');
  if (registrationForm) {
    let step = 1;
    const steps = $$('.form-step', registrationForm);
    const pills = $$('[data-step-pill]');
    const refresh = () => {
      steps.forEach(s => s.classList.toggle('active', Number(s.dataset.step) === step));
      pills.forEach(p => p.classList.toggle('active', Number(p.dataset.stepPill) === step));
      if (step === 3) {
        const data = new FormData(registrationForm);
        const summary = $('#registrationSummary');
        if (summary) {
          summary.innerHTML = `
            <p><strong>${data.get('nombres') || ''} ${data.get('apellidos') || ''}</strong></p>
            <p>${data.get('correo') || ''}</p>
            <p>Participación: <strong>${data.get('tipo') || 'General'}</strong></p>
          `;
        }
      }
      window.scrollTo({top: registrationForm.getBoundingClientRect().top + scrollY - 110, behavior:'smooth'});
    };
    $$('[data-next-step]', registrationForm).forEach(btn => btn.addEventListener('click', () => {
      if (step === 1) {
        const required = $$('input[required]', steps[0]);
        if (required.some(i => !i.value.trim())) {
          showToast('Completa los campos obligatorios para continuar.');
          return;
        }
      }
      step = Math.min(3, step + 1); refresh();
    }));
    $$('[data-prev-step]', registrationForm).forEach(btn => btn.addEventListener('click', () => {
      step = Math.max(1, step - 1); refresh();
    }));
    $$('.participant-option', registrationForm).forEach(opt => {
      opt.addEventListener('click', () => {
        $$('.participant-option', registrationForm).forEach(x => x.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });
    registrationForm.addEventListener('submit', e => {
      e.preventDefault();
      showToast('Preinscripción de demostración completada.');
      registrationForm.reset();
      step = 1;
      $$('.participant-option', registrationForm).forEach((x,i)=>x.classList.toggle('selected', i===0));
      refresh();
    });
  }
  const galleryFilters = $('[data-gallery-filters]');
  if (galleryFilters) {
    const items = $$('[data-gallery-item]');
    galleryFilters.addEventListener('click', e => {
      const btn = e.target.closest('[data-gallery]');
      if (!btn) return;
      $$('.chip', galleryFilters).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.gallery;
      items.forEach(item => item.classList.toggle('hidden', type !== 'all' && item.dataset.galleryItem !== type));
    });
  }
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImage');
  if (lightbox && lightboxImg) {
    $$('[data-full]').forEach(item => item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.full;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
      document.body.style.overflow = 'hidden';
    }));
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
    };
    $('#lightboxClose')?.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }
  $$('.faq-item button').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
      const sign = $('span', btn);
      if (sign) sign.textContent = item.classList.contains('open') ? '−' : '+';
    });
  });
  $('#contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('Mensaje de demostración enviado. En producción se conectará al correo o CRM.');
    e.currentTarget.reset();
  });
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const target = $(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({behavior:'smooth', block:'start'});
  }));
})();