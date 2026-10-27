# Cierre institucional COEPROTEC — checklist de lanzamiento

**Nombre oficial:** Congreso Económico de Profesionales y Técnicos – COEPROTEC.

## Preparado en la rama `Abraham/preview-gerencia`

- Sitio institucional HTML/CSS/JS con páginas inicio, agenda, ponentes, contacto y archivo histórico 2025.
- Se retiró de la portada pública el formulario deshabilitado y los avisos de prerregistro «en preparación». En su lugar hay una llamada a contactar a COEPROTEC.
- El código del endpoint `functions/api/prerregistro.js`, Turnstile y base D1 se conserva sin habilitar la recepción de datos.
- Nombre oficial aplicado en títulos y mensajes relevantes; la marca corta COEPROTEC se conserva para cabeceras y navegación.
- Cloudflare Pages institucional conectado con GitHub y disponible mediante dominio temporal.
- Política de privacidad provisional en `privacidad.html`; sigue en revisión.

## BLOQUEOS antes de considerar oficialmente publicado

- [ ] Pruebas de navegación, páginas, enlaces, fotos, móvil y teclado en el despliegue realmente publicado.
- [ ] Pruebas automatizadas y del endpoint, además de comprobar que la API sigue cerrada.
- [ ] Autorización de derechos de fotos, videos, logos, contenido institucional y de aliados.
- [ ] Aprobación de textos de ponentes, fechas y organizadores; no anunciar eventos como vigentes si ya pasaron.
- [ ] Revisar situación vigente del dominio `coeprotec.com` (vigencia, restricciones, estado DNS) y crear backup de todos los registros.
- [ ] Validar recepción y envío de correo institucional; preservar MX/SPF/DKIM/DMARC, mail y autoconfig.
- [ ] Configurar `www.coeprotec.com` como dominio personalizado en Cloudflare Pages, HTTPS y redirección planeada de raíz.
- [ ] Tras lanzamiento, añadir canónicas definitivas, sitemap, robots.txt e indexación; por ahora el sitio permanece con noindex.
- [ ] Revisión legal de privacidad y banco de datos antes de habilitar formularios; rate limiting, retención, D1, QA.
- [ ] Revisar PR de `Abraham/preview-gerencia` hacia `main`; verificar la rama de producción en Cloudflare después del merge.

## Importante

**No confundir «código actualizado» con «aprobación para publicar»**. La rama main sigue teniendo el prototipo anterior mientras no se integre el PR. Cambiar un CNAME o seleccionar main antes de integrar podría mostrar una versión distinta de la esperada.

El nombre oficial no implica por sí mismo personería jurídica propia; en tratamiento de datos, la empresa responsable indicada en el borrador es Consultoria Empresarial P & M S.A.C., RUC 20523027655, según autorización comunicada por gerencia.
