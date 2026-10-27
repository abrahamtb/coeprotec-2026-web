# Prerregistro COEPROTEC — estado y habilitación

Estado: interfaz visible **deshabilitada**. No recolectar datos personales hasta la autorización institucional.

## Implementación

- Formulario en `index.html#prerregistro`, deshabilitado deliberadamente.
- Endpoint `POST /api/prerregistro` en Cloudflare Pages Functions, **bloqueado** salvo `PREREG_ENABLED=true`.
- Base Cloudflare D1: esquema `db/prerregistros.sql`. Binding **PREREG_DB**.
- Secreto Cloudflare Pages: **TURNSTILE_SECRET_KEY**. Se requiere además su widget con site key pública cuando se habilite.
- Variable **PRIVACY_VERSION**: versión aprobada de la Política de Privacidad, nunca “pendiente” al activar.

## Requisitos para habilitar (no implementados aún)

1. Gerencia confirma razón social, RUC/domicilio, responsable, finalidades, retención y correo de ejercicio de derechos. Publicar política revisada para Ley 29733.
2. Crear D1 en cuenta Cloudflare institucional, ejecutar migración SQL y asociar binding `PREREG_DB` al entorno de producción del proyecto Pages.
3. Crear Cloudflare Turnstile para los dominios de despliegue y conectar widget al formulario. Configurar `TURNSTILE_SECRET_KEY` como secreto; validar E2E y fallo por token incorrecto.
4. Añadir manejador JS para enviar mediante fetch, prevenir doble envío y mostrar errores seguros; enlazar política y versiones de consentimiento.
5. Configurar protección de tasa de solicitudes (rate limit/WAF), definir política de duplicados, acceso administrativo autenticado y exportación segura de interesados.
6. Hacer QA de formularios, móviles, red, privacidad y seguridad; solo entonces retirar `disabled` y establecer `PREREG_ENABLED=true` y `PRIVACY_VERSION` real.

## Precauciones

La rama `Abraham/preview-gerencia` está usada como producción por Cloudflare Pages de prueba. No introducir datos reales en ella hasta habilitación aprobada. No publicar APIs de consulta o exportación sin autenticación. No subir secretos al repositorio.

Cloudflare Pages Functions requiere que la carpeta `functions/` esté en el proyecto Git y no en un subdirectorio del directorio de salida.

## Responsable confirmado por gerencia (27/10/2026)

- Marca operativa: COEPROTEC (aún sin RUC propio).
- Responsable autorizado temporalmente: CONSULTORIA EMPRESARIAL P & M SOCIEDAD ANONIMA CERRADA, RUC 20523027655.
- Autorización: confirmación comunicada por la persona encargada del proyecto, a solicitud de gerencia. Se recomienda respaldarla internamente por escrito.
- Información preliminar publicada en `privacidad.html`; **no** sustituye la política aprobada.
- Pendientes: domicilio, canal ARCO/revocación, plazo de conservación, encargados y transferencias, inscripción del banco cuando corresponda y aprobación jurídica del texto definitivo.
- `PREREG_ENABLED` permanece sin activar; no almacenar registros reales todavía.

- Dirección del responsable comunicada por el usuario: Calle La Pera N.º 435, Urb. Los Sauces II, Surquillo, Lima, Perú. Pendiente corroboración documental como domicilio fiscal vigente.

- Correo institucional designado para consultas y ejercicio de derechos sobre datos personales: admin.general@coeprotec.com. Confirmar responsable de atención, procedimiento y plazos antes del lanzamiento.

- Plazo de conservación aprobado por el usuario en nombre de gerencia: máximo 12 meses desde el último contacto o interacción registrada; sujeto a obligaciones legales aplicables. Pendiente mecanismo técnico de seguimiento de última interacción, eliminación y solicitudes de supresión.

## Auditoría técnica de preparación — 27/10/2026

**Estado: NO APTO PARA ACTIVAR LA CAPTURA TODAVÍA.**

Controles existentes:
- Formulario inhabilitado vía fieldset disabled en `index.html`.
- Turnstile con site key pública en el navegador y validación secreta + hostname del token en Pages Functions.
- API con doble interruptor: `PREREG_ENABLED=true` y `PREREG_SECURITY_APPROVED=true`; no configurar ninguno aún.
- `PRIVACY_VERSION` debe corresponder a versión formalmente aprobada con formato `AAAA-MM-DD-vN`, p. ej. `2026-11-01-v1`, no publicar ejemplo como si estuviera aprobado.
- D1 de COEPROTEC: tabla `preregistros`; autenticación al panel solo por la cuenta institucional Cloudflare.

Bloqueadores verificables antes de salir a producción:
1. Revisar y aprobar texto final de política, procedimiento de solicitudes de derechos, encargados y posibles transferencias internacionales; comprobar alcance del servicio Cloudflare y respaldo de autorización de gerencia. La página `privacidad.html` sigue marcada en revisión.
2. Completar registro del banco de datos personales ante ANPD por titular autorizado; consultar <https://www.gob.pe/8060>.
3. Configurar en Cloudflare una regla de protección antiabuso / rate limiting sobre `/api/prerregistro`, con verificación de que no afecte el sitio; Turnstile solo no impone una cuota.
4. Establecer criterio ante correos duplicados, pruebas de retención y ejecución autorizada de eliminación. El SQL de limpieza manual está preparado en `db/prerregistros_retencion.sql`, **no es automático**.
5. QA del despliegue activo: redeploy tras crear binding y secreto, comprobar que `POST /api/prerregistro` devuelve 503 mientras el servicio está bloqueado; verificar 405 en GET; comprobar formulario móvil, privacidad, acceso por navegación y no exposición de información personal.
6. Probar contra una base de ensayo aislada o registros sintéticos antes de activar variables de producción; nunca ejecutar pruebas de escritura con datos reales sin aprobación.
7. Registro administrativo de lectura/exportación y restricción del acceso; no crear endpoint público de consulta de información personal.

Precaución: la conservación acordada se calcula desde el **último contacto o interacción**. El esquema actual guarda `creado_en` y **no registra por sí solo la última interacción**. Antes de automatizar la limpieza debe añadirse un registro verificable de interacciones; de otro modo una limpieza a partir de `creado_en` podría borrar antes del plazo comunicado.

Para activar en el futuro se requiere retirar el `disabled` de la interfaz y aprobar expresamente ambos interruptores; no basta con disponer de D1 y el secreto.
