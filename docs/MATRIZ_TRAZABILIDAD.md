# Matriz de trazabilidad

| Requisito | Test IDs | Nivel | Estado | Evidencia |
|---|---|---|---|---|
| Login con usuario válido | WEB-01 | E2E / Manual | PASS | `reports/e2e-results.json`, `docs/manual/CASOS/WEB/WEB-01_login_correcto.md` |
| Usuario bloqueado | WEB-02 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-02 |
| Credenciales inválidas | WEB-03 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-03 |
| Campos vacíos | WEB-04 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-04 |
| Añadir un producto | WEB-05 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-05 |
| Añadir tres productos | WEB-06 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-06 |
| Eliminar producto | WEB-07 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-07 |
| Checkout completado | WEB-08, REG-01 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-08 |
| Checkout sin datos | WEB-09 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-09 |
| Orden por precio | WEB-10 | E2E / Manual | PASS | `reports/e2e-results.json`, caso manual WEB-10 |
| Auth válido | API-01 | API / Manual | PASS | `api/schemas/auth.schema.json`, caso manual API-01 |
| Auth inválido | API-02 | API / Manual | PASS | `reports/api-results.json`, caso manual API-02 |
| Listar reservas | API-03 | API / Manual | PASS | `reports/api-results.json`, caso manual API-03 |
| Obtener reserva + schema | API-04 | API / Manual | PASS | `api/schemas/booking.schema.json`, caso manual API-04 |
| Crear reserva + schema | API-05 | API / Manual | PASS | `api/schemas/booking.schema.json`, caso manual API-05 |
| Actualizar reserva (PUT) | API-06 | API / Manual | PASS | `reports/api-results.json`, caso manual API-06 |
| Actualizar reserva (PATCH) | API-07 | API / Manual | PASS | `reports/api-results.json`, caso manual API-07 |
| Eliminar reserva | API-08 | API / Manual | PASS | `reports/api-results.json`, caso manual API-08 |
| PUT sin token | API-09 | API / Manual | PASS | `reports/api-results.json`, caso manual API-09 |
| Reserva inexistente | API-10 | API / Manual | PASS | `reports/api-results.json`, caso manual API-10 |
| POST inválido | API-11 | API / Manual | PASS | `reports/api-results.json`, caso manual API-11 |
| Carga 10 usuarios / 60 s | JM-01 | JMeter / Manual | PASS | `load/BASELINE.md`, `load/report/index.html` |
| DAST ZAP baseline | SEC-01 | Seguridad / Manual | CI | `docs/SEGURIDAD.md`, artefacto ZAP |
| SCA Dependency-Check | SEC-02 | Seguridad / Manual | CI | `docs/SEGURIDAD.md`, artefacto SCA |
| OWASP API Top 10 | SEC-03 | Seguridad / Manual | Parcial | `docs/SEGURIDAD.md`, API-09/10 |

Los casos manuales están en `docs/manual/CASOS/` y la correspondencia exacta con los specs en `docs/manual/MATRIZ_MANUAL_AUTO.md`.
