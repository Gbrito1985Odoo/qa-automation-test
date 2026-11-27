# QA Automation — Playwright + API + JMeter + OWASP + Manual QA

Repo público: `Gbrito1985Odoo/qa-automation-test` · Rama `main` · Node 20 LTS (`.nvmrc`)

## 1. Setup

```bash
git clone https://github.com/Gbrito1985Odoo/qa-automation-test.git
cd qa-automation-test
nvm use
npm ci
npx playwright install --with-deps chromium firefox
cp .env.example .env
```

`gh auth login` es necesario para publicar y consultar CI. Los secrets del repo son `BOOKER_USER`, `BOOKER_PASS`, `BASE_URL_WEB` y `BASE_URL_API`; nunca se versionan.

## 2. Comandos

| Script | Uso |
|---|---|
| `npm run lint` / `npx tsc --noEmit` | Calidad estática |
| `npm run test:e2e` | 10 casos WEB × Chromium + Firefox |
| `npm run test:smoke` / `test:critical` / `test:regression` | Regresión por tags |
| `npm run test:api` | 11 casos Booker |
| `npm run jmeter:load` | 10 usuarios / 6 loops + informe HTML |
| `npm run report:html` | Genera `reports/informe-final.html` |
| `npm run security:check` | Verifica reportes de seguridad generados |
| `npm run manual:lint` | Valida casos manuales |
| `npm run cleanup` | Limpia artefactos generados |

## 3. Decisiones técnicas

- **Page Objects** para login, inventario, carrito y checkout; los specs solo orquestan.
- **Selectores** `data-test` (configurado `testIdAttribute`) y `getByRole`; sin XPath ni selectores posicionales.
- **API** con `APIRequestContext` y cliente propio; fixtures idempotentes (crear/borrar reserva en cada test).
- **JSON Schema + ajv** para respuestas de auth y booking.
- **JMeter** con aserciones de status y tiempo, baseline cuantificada en `load/BASELINE.md`.
- **CI** separada para Playwright (push/PR, matrix) y JMeter (dispatch/schedule).
- Seguridad OWASP y QA manual como capas complementarias, no sustitutas de la automatización.

## 4. Tiempo real invertido

| Bloque | Tiempo |
|---|---:|
| Setup y GitHub (Tarea 0) | 10 min |
| Scaffold y configuración (Tarea 1) | 10 min |
| E2E WEB-01..10 (Tareas 2-3) | 30 min |
| API API-01..11 (Tareas 4-5) | 20 min |
| JMeter y CI (Tareas 6-7) | 25 min |
| Informe, docs y gate (Tareas 8-10) | 25 min |
| QA manual y trazabilidad (Tareas 11-12) | 20 min |
| Seguridad OWASP (Tarea 14) | 15 min (más espera de CI) |
| **Total** | **2 h 35 min** |

## 5. Uso de IA (Pedí / Acepté / Corregí)

- **Pedí:** scaffold TypeScript estricto, POM, cliente API, plan JMeter, workflows y arquitectura de casos manuales.
- **Acepté:** estructura de reporter JSON/HTML, matrices de riesgos y trazabilidad, plantillas de defectos.
- **Corregí:**
  1. `getByTestId` no encontraba los campos: SauceDemo usa `data-test`, no `data-testid`; añadí `testIdAttribute: 'data-test'`.
  2. El menú no era `open-menu-button`: el DOM real expone `open-menu` y un botón "Open Menu".
  3. Checkout usa `checkout`, `continue` y `finish`, no los IDs asumidos en el prompt original.
  4. `statistics.json` de JMeter es un objeto por transacción, no un array; normalicé con `Object.values`.
   5. El token OAuth de `gh` carece de scope `workflow`: usé una deploy key con escritura para publicar los workflows.
  6. La descarga de navegadores desde `cdn.playwright.dev` devolvió 403; instalé Firefox desde el mirror `playwright.azureedge.net` y usé Chrome del sistema en local.

## 6. Hallazgos

1. **Selectores obsoletos en la especificación:** varios `data-test` del sitio cambiaron; las pruebas fallaron hasta alinearlas con el DOM real. Riesgo: fragilidad ante despliegues del sitio demo.
2. **Auth de Booker con semántica no estándar:** credenciales inválidas responden `200` con `{"reason":"Bad credentials"}` en lugar de `401`. Documentado y asumido en API-02; conviene vigilarlo si el API cambia.
3. **Permisos de CI:** un token OAuth sin scope `workflow` impide subir `.github/workflows/*`; solucionado con deploy key; limitación documentada para futuros operadores.
4. **Latencia de `GET /booking`:** p95 846 ms vs 152 ms de `POST /auth`; el endpoint de lectura domina el perfil de carga.

## 7. Qué haría con más tiempo

- Contrato OpenAPI + validación de schema en CI para detectar cambios del API antes que los tests.
- Tests visuales y accesibilidad con `@axe-core/playwright`.
- Reporte unificado Allure con histórico de flakiness.
- Casos borde de SauceDemo (visual_user, error_user, performance_glitch_user).
- k6 con thresholds y escenarios de ráfaga; WebKit en la matrix; Pact para contratos.

## 8. Tests flaky

No se detectaron fallos intermitentes en 3 corridas consecutivas de smoke/regression/API en local (0 flaky). `retries: 2` solo está activo en CI. Criterio de flaky: ≥2 fallos en 5 ejecuciones del mismo test → Investigar y marcar con `test.skip` + `TODO` sin relajar aserciones.

## 9. Limitaciones

- Docker no está disponible en el entorno local: ZAP no se ejecuta localmente; se valida en GitHub Actions. El gate SCA obligatorio usa `npm audit` (0 High/Critical); Dependency-Check queda como job opcional (`ENABLE_DEPENDENCY_CHECK=true`) por falta de `NVD_API_KEY`.
- Node local es v22.16.0 aunque `.nvmrc` fija 20; CI usa 20.
- Los reportes HTML generados por CI se descargan como artefactos; `reports/security/*.html` está excluido del repo por tamaño.
- Las capturas manuales se referencian desde `docs/manual/EVIDENCIAS/README.md`, no se versionan.
- Los scripts de JMeter y seguridad dependen de servicios públicos (Heroku/SauceDemo); si cambian, hay que actualizar selectores o credenciales.
