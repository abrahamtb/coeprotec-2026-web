-- Ejecutar en Cloudflare D1 institucional; nunca en navegador ni datos de producción sin autorización.
CREATE TABLE IF NOT EXISTS preregistros (
 id TEXT PRIMARY KEY,
 nombre TEXT NOT NULL CHECK(length(nombre) BETWEEN 3 AND 100),
 correo TEXT NOT NULL,
 telefono TEXT,
 interes TEXT NOT NULL CHECK(interes IN ('capacitacion','eventos','institucional')),
 consentimiento INTEGER NOT NULL CHECK(consentimiento=1),
 marketing INTEGER NOT NULL DEFAULT 0 CHECK(marketing IN (0,1)),
 consentimiento_version TEXT NOT NULL,
 creado_en TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_preregistros_fecha ON preregistros(creado_en);
