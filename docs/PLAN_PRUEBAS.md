# Plan de pruebas

## Alcance

- Web (SauceDemo): autenticación, inventario, carrito y checkout en Chromium y Firefox.
- API (Restful Booker): auth, CRUD, negativos y validación de esquemas JSON.
- Carga: 10 usuarios virtuales, ramp-up 10 s, 6 loops sobre `GET /booking` y `POST /auth`.
- Seguridad: OWASP ZAP baseline/API scan y OWASP Dependency-Check en CI.
- Manual: 24 casos alineados 1:1 con la automatización (`docs/manual/`).

Fuera de alcance: WebKit, datos de producción, pruebas de accesibilidad automatizadas y modificación de servicios de terceros.

## Estrategia y regresión por tags

| Tag | Objetivo | Comando |
|---|---|---|
| `@smoke` | Verificación rápida antes de despliegue | `npm run test:smoke` |
| `@critical` | Flujos de negocio críticos | `npm run test:critical` |
| `@regression` | Regresión amplia web + API | `npm run test:regression` y `npm run test:api` |

Criterio de flaky: un test con ≥2 fallos en 5 ejecuciones consecutivas se marca `test.skip` con `TODO` y se documenta en README; nunca se relaja una aserción para ocultar el fallo.

## Criterios de entrada

- Repo público, `main` verde en CI, dependencias fijadas por `package-lock.json`.
- Servicios externos accesibles (SauceDemo y Booker) y secrets configurados.
- Casos manuales con datos y evidencia definida.

## Criterios de salida

- E2E y API en verde en ambos navegadores; error rate JMeter < 1 % y p95 < 1500 ms.
- Security workflow sin Hallazgos High; `manual:lint` verde; informe HTML generado.
- `reports/evolucion.log` con entrada por tarea y commit por función verificada.

## Matriz de trazabilidad (resumen)

| Requisito | Casos | Nivel | Estado |
|---|---|---|---|
| Login correcto e incorrecto | WEB-01..04 | E2E + Manual | Automatizado |
| Carrito y orden por precio | WEB-05..07, WEB-10 | E2E + Manual | Automatizado |
| Checkout | WEB-08..09, REG-01 | E2E + Manual | Automatizado |
| Auth y CRUD Booker | API-01..08 | API + Manual | Automatizado |
| Negativos y esquemas | API-09..11 | API + Manual | Automatizado |
| Carga | JM-01 | JMeter + Manual | Ejecutado |
| Seguridad | SEC-01..03 | CI + Manual | Ejecutado: ZAP 0 High + SCA 0 High/Critical (ver SEGURIDAD.md) |

La tabla completa está en `docs/MATRIZ_TRAZABILIDAD.md` y la cruzada manual↔auto en `docs/manual/MATRIZ_MANUAL_AUTO.md`.
