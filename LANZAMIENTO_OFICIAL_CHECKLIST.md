# COEPROTEC — Lista de control para lanzamiento oficial

Fecha: 2026-10-26
Dominio propuesto: **coeprotec.com** (titularidad, registro y DNS no verificados).
Titular legal declarado por solicitante: **COEPROTEC como entidad registrada** (razón social, RUC, representante y domicilio **por acreditar**).
Rama de preparación: `Abraham/preview-gerencia`. **No publicar automáticamente en `main`**.

## Bloqueantes de lanzamiento

- [ ] Verificar registro de coeprotec.com, titularidad, registrador, fecha de vencimiento y control de DNS. No comprar ni transferir sin autorización.
- [ ] Validar denominación legal, RUC, domicilio, canal de derechos de datos y representante autorizado de COEPROTEC.
- [ ] Inventariar **todas** las fotografías, logotipos, videos, tipografías y materiales de terceros; documentar licencia/autorización, atribución y posibilidad de uso institucional/comercial.
- [ ] Validar que las piezas sobre COEPROTEC 2025 y la presentación de Diego Patiño Coello son correctas y autorizadas; retirar o corregir datos no sustentados.
- [ ] Validar uso del logo UPC, nombres de ponentes y la calidad de 'auspiciador'; verificar enlace externo de inscripción y vigencia del anuncio del 17/11/2026.
- [ ] Elaborar y aprobar **Política de privacidad** con datos reales del responsable; evaluar WhatsApp, analítica, videos incrustados, transferencias internacionales y derechos de titulares. No inventar razón social ni contacto.
- [ ] Aprobar condiciones de uso, contacto institucional, textos de derechos reservados y revisión legal local; evaluar Libro de Reclamaciones si se ofrece o contrata consumo por la web.
- [ ] QA real: móvil/escritorio, enlaces, consola, accesibilidad básica, performance, permisos de videos y comprobación del formulario a WhatsApp.
- [ ] Verificar MFA y permisos mínimos en cuentas GitHub, registrador, Cloudflare, Search Console; respaldos y procedimiento de reversión.

## Conectar Cloudflare

1. Confirmar proyecto correcto y la rama que despliega. **No reemplazar el origen sin copia de seguridad**.
2. En Workers & Pages > proyecto > Custom domains > Set up a domain, ingresar `coeprotec.com`.
3. Para dominio raíz, gestionar zona Cloudflare y apuntar los *nameservers* desde el registrador a los asignados específicamente. Respetar DNS preexistente, en especial MX/TXT del correo.
4. Añadir `www.coeprotec.com` como dominio adicional y elegir redirección canónica (www o raíz).
5. Verificar HTTPS, certificado, respuesta 200 y redirecciones; no suponer que la propagación es inmediata.

## Abrir indexación *solo tras aprobación y control de dominio*

- [ ] Retirar `<meta name="robots" content="noindex,nofollow">` de las páginas públicas aprobadas.
- [ ] Crear `robots.txt` y `sitemap.xml` con URLs **del dominio oficial comprobado**, no del preview.
- [ ] Establecer canonical por página, títulos y descripciones verificados, Open Graph y favicon.
- [ ] Dar de alta una propiedad Dominio en Search Console y agregar el TXT que **Google genere** en DNS. No inventar el valor.
- [ ] Enviar sitemap, probar inspección de URL, solicitar indexación y revisar cobertura. La indexación no es inmediata ni garantizada.
- [ ] Mantener estrategia de no indexar vistas de prueba, y redirigir el subdominio pages.dev si corresponde.

## Estado técnico observado

- Web estática informativa; Supabase y panel de administración no implementados.
- Archivos HTML de las cinco páginas revisadas contienen `noindex,nofollow`.
- `contacto.html` se corrigió para colocar su script dentro del documento HTML.
- `_headers` incluye medidas básicas: nosniff, anti-iframe, referrer-policy y permissions-policy.
- Video Drive «Presentación PyM · 3 minutos» tiene atribución concreta al congreso 2025 **no confirmada**.
- No existen evidencias en esta revisión de compra, posesión o DNS de `coeprotec.com`.
- Pendiente confirmar Cloudflare dashboard, Search Console y publicación real del dominio.

Documentación técnica: https://developers.cloudflare.com/pages/configuration/custom-domains/
Search Console: https://support.google.com/webmasters/answer/9008080
Normativa Perú: https://www.gob.pe/institucion/anpd/campañas/128319-nuevo-reglamento-de-proteccion-de-datos-personales
