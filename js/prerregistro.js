// Prerregistro COEPROTEC: el formulario permanece bloqueado hasta la aprobación legal y QA.
(() => {
  const form = document.getElementById('preregistro-form');
  const status = document.getElementById('preregistro-aviso');
  if (!form || !status) return;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fieldset = form.querySelector('fieldset');
    if (!fieldset || fieldset.disabled) return;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const token = window.turnstile?.getResponse?.();
    if (!token) {
      status.textContent = 'Completa la verificación de seguridad.';
      return;
    }
    const payload = {
      nombre: String(data.get('nombre') || '').trim(),
      correo: String(data.get('correo') || '').trim(),
      telefono: String(data.get('telefono') || '').trim(),
      interes: String(data.get('interes') || ''),
      consentimiento: data.get('consentimiento') === 'on',
      marketing: data.get('marketing') === 'on',
      turnstileToken: token
    };
    if (!payload.consentimiento) {
      status.textContent = 'Debes aceptar el consentimiento necesario para gestionar tu solicitud.';
      return;
    }
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    status.textContent = 'Validando y enviando tu registro…';
    try {
      const response = await fetch('/api/prerregistro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'No fue posible registrar tu solicitud.');
      status.textContent = 'Tu prerregistro fue recibido correctamente.';
      form.reset();
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : 'No fue posible registrar tu solicitud.';
    } finally {
      window.turnstile?.reset?.();
      button.disabled = false;
    }
  });
})();
