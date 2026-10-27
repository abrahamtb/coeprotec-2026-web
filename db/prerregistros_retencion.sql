-- Auditoría PREVIA de antigüedad. NO elimina registros ni sustituye seguimiento de última interacción.
-- Consultar esta lista solo por personal autorizado. No exportar ni divulgar datos personales.
-- La conservación aprobada son 12 meses desde la última interacción, NO desde la creación.
-- El esquema inicial únicamente contiene creado_en; por ello este SQL SOLO informa, no decide bajas.
SELECT COUNT(*) AS registros_con_creacion_anterior_12_meses
FROM preregistros
WHERE datetime(creado_en) < datetime('now', '-12 months');

-- NO EJECUTAR BORRADOS antes de disponer de la fecha de última interacción,
-- un procedimiento documentado, validación de obligaciones legales y aprobación de gerencia.
