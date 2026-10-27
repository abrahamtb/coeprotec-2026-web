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
