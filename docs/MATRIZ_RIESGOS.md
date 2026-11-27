# Matriz de riesgos

Probabilidad (P) e impacto (I) en escala 1-5. Riesgo = P × I. Alta si ≥12, Media si 6-11, Baja si ≤5.

| # | Riesgo | P | I | P×I | Nivel | Mitigación |
|---:|---|---:|---:|---:|---|---|
| 1 | Cambio de selectores en SauceDemo | 4 | 4 | 16 | Alta | POM + `data-test`/`getByRole`, revisiones semanales |
| 2 | Caída de Restful Booker (Heroku) | 3 | 5 | 15 | Alta | `test.skip` + `TODO`, documentar en README, reintentos en CI |
| 3 | Credenciales inválidas por rotación de secrets | 2 | 5 | 10 | Media | Secrets en GitHub, `.env.example`, validación en API-01 |
| 4 | Flakiness por latencia de red | 3 | 3 | 9 | Media | `retries: 2` en CI, umbral ≥2/5 para declarar flaky |
| 5 | Regresión en checkout | 2 | 5 | 10 | Media | `@critical` + `@regression`, WEB-08/09 y REG-01 |
| 6 | Pérdida de datos de reserva entre tests | 2 | 4 | 8 | Media | beforeEach/afterEach crean y borran la reserva |
| 7 | Secretos versionados por error | 1 | 5 | 5 | Baja | `.gitignore` con `.env`, revisión de commits |
| 8 | Dependencias con CVE | 3 | 4 | 12 | Alta | Dependency-Check `--failOnCVSS 7` en CI |
| 9 | Cabeceras de seguridad ausentes | 4 | 3 | 12 | Alta | ZAP baseline con `fail_action: true` y supresiones justificadas |
| 10 | BOLA/IDOR en API Booker | 3 | 5 | 15 | Alta | API-09/10 y documentación de limitación en SEGURIDAD.md |
| 11 | Informe HTML con cifras desactualizadas | 3 | 2 | 6 | Media | Generación automática desde artefactos reales |
| 12 | Casos manuales sin evidencia | 3 | 3 | 9 | Media | `manual:lint` exige sección "Evidencia requerida" |
| 13 | Diferencias Chromium/Firefox | 2 | 4 | 8 | Media | Matrix de proyectos en CI |
| 14 | Push bloqueado por permisos de workflows | 2 | 2 | 4 | Baja | Deploy key con escritura, documentado en evolución |
| 15 | Carga por encima del baseline | 2 | 3 | 6 | Media | Comparar p95 × 1.5 y error rate < 1 % |

Riesgos 1, 2, 8, 9 y 10 requieren seguimiento prioritario por superar 12 puntos.
