# COEPROTEC · web institucional y agenda

Sitio estático para presentar COEPROTEC, sus líneas de formación y los futuros eventos. **El evento académico de la UPC no se inscribe aquí**. No hay un QR en el proyecto: se creará cuando se apruebe la publicación y se confirme la URL oficial.

## Estado actual

- Portada institucional con servicios derivados de la minuta facilitada, sin publicar datos de socios ni afirmar inscripción registral.
- Agenda en `inscripciones.html`: muestra un estado vacío honesto hasta que existan eventos confirmados. El nombre de archivo se conserva para no romper enlaces anteriores, pero la página ya no registra asistentes.
- `js/events-data.js` es la fuente de eventos futuros. Solo se deben añadir actividades confirmadas. El renderizador ordena por fecha y oculta las pasadas.
- Contacto mediante WhatsApp 971 947 284. No hay correo institucional ni formulario de consultas todavía.
- **No hay tablas ni formulario de inscripción activo.** Existe un proyecto Supabase Free de pruebas, todavía vacío y no conectado a la web. Deben definirse el tratamiento de datos y el modelo multi-evento antes de activarlo.

## Para añadir un evento

Editar `js/events-data.js` y añadir un objeto confirmado a `window.COEPROTEC_EVENTS` con `title`, `date` (AAAA-MM-DD), `summary`, y opcionalmente `time`, `mode`, `venue`, `status` y `detailsUrl`. El estado `open` solo debe usarse cuando exista una ficha y un flujo de inscripción funcional y probado. No enlazar formularios ficticios ni URLs externas no revisadas.

## Pendientes antes de publicar

1. Confirmar con la gerencia la descripción institucional y los servicios, ya que la minuta facilitada aún contiene campos pendientes y no prueba la inscripción de la sociedad.
2. Confirmar el dominio definitivo. Crear y probar el QR únicamente después de aprobar la publicación oficial.
3. Confirmar los próximos eventos: título, fecha, modalidad, lugar, programa, organizador, aforo y condiciones de participación.
4. Definir para cada inscripción los datos necesarios, responsable del tratamiento, aviso de privacidad, conservación, medidas antispam y canal de atención. Después diseñar y probar un backend multi-evento.
5. Confirmar si se publicará un correo institucional y otros canales de contacto.
6. Las rutas heredadas del prototipo redirigen a la portada o la agenda. Reconstruirlas solo con contenido institucional y eventos verificados.

## Desarrollo local

Servir la carpeta con `python -m http.server 8765` y abrir `http://127.0.0.1:8765/`. La acción de GitHub Pages se ejecuta al subir cambios a `main`; **no hacer push a `main` hasta que la gerencia apruebe contenido, dominio y publicación**.

## Vista previa para gerencia

La rama `Abraham/preview-gerencia` contiene la web propuesta sin modificar `main` y está desplegada en [Cloudflare Pages](https://coeprotec-2026-web.pages.dev/). Es una prueba pública para gerencia: cualquier persona que tenga el enlace puede verla. En este proyecto Pages, esa rama es la rama de despliegue principal temporal; las demás ramas no se despliegan automáticamente. Esta versión incluye `noindex` y `robots.txt` para desalentar la indexación. Antes de convertirla en web oficial, confirmar contenido y dominio, quitar esas restricciones y cambiar la rama principal a `main` solo después de aprobarla. El QR se generará solo después de tener una URL oficial aprobada.
