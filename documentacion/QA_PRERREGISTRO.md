# QA de prerregistro COEPROTEC — entorno aislado

## Alcance y seguridad
Esta rama es de **pruebas**. No fusionar a `main` ni activar el prerregistro sin autorización institucional. No usar datos personales reales, bases productivas ni secretos en GitHub.

## 1. Crear D1 QA desde Cloudflare
1. Cuenta institucional → **Storage & databases → D1 SQL Database → Create database**.
2. Nombre: `coeprotec-prerregistros-qa`.
3. Dentro de la **nueva** base, abrir **Console** y ejecutar el contenido de `db/prerregistros.sql`. Confirmar primero que el nombre visible sea exactamente `coeprotec-prerregistros-qa`.
4. Comprobar esquema: `SELECT name FROM sqlite_master WHERE type='table';`.
5. Comprobar que está vacía: `SELECT COUNT(*) AS total FROM preregistros;` (debe ser cero).
6. No conectar esta base al despliegue de producción. No cambiar el binding `PREREG_DB` de producción.

## 2. Pruebas unitarias locales (sin Cloudflare)
Con Node.js 20 o superior, desde la raíz del repositorio:
```bash
node --test tests/prerregistro.test.mjs
node --test tests/prerregistro-qa.test.mjs
```
Los mocks de Turnstile y D1 no prueban que la integración real funcione; solo verifican la lógica de la API.

## 3. Integración QA (aún pendiente)
Usar un entorno Pages Preview **separado** con binding `PREREG_DB` apuntando exclusivamente a `coeprotec-prerregistros-qa`, claves Turnstile **de prueba** y un `PRIVACY_VERSION` sintético solo para QA. Las variables `PREREG_ENABLED=true` y `PREREG_SECURITY_APPROVED=true` se permiten **únicamente en Preview QA**, jamás en Production. Asegurar restricción de acceso al Preview antes de habilitar cualquier escritura. No registrar correos reales.

Casos: respuesta 201 de inserción; 400 campos inválidos; 403 origen/token inválidos; 413 exceso de tamaño; 415 formato; 405 método GET; 503 por configuración/bloqueo; verificar los registros en D1 QA, y eliminarlos al finalizar pruebas.

## 4. Bloqueos antes de activar producción
- Revisar aprobación legal, banco de datos y privacidad vigente.
- Implementar control real de solicitudes (WAF/Rate Limiting por endpoint y defensa de reintentos) y probarlo.
- Definir política de duplicados e implementar restricción/flujo correspondiente.
- Verificar origen, hostname, Turnstile, tratamiento seguro de logs y fallos de D1.
- Implementar acceso administrativo seguro, sin exponer un endpoint público de listados.
- Probar proceso de conservación y eliminación de información, incluidas copias y solicitudes de los titulares.
- Ejecutar pruebas end-to-end en Preview QA y documentar resultados; aprobación explícita de gerencia.
