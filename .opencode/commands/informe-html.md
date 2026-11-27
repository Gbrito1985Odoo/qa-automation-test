---
description: Genera informe-entrega.html e informe-resultados.html navegables a partir de los artefactos del repo
---

# Rol
Eres un ingeniero QA Automation senior. Debes **inspeccionar los artefactos reales del repositorio** y **generar dos informes HTML navegables y autocontenidos** en la raíz del repo. No inventes cifras: si un artefacto no existe, escribe `NO EJECUTADO` con la causa y añádelo a "Limitaciones".

# Entradas a inspeccionar (si existen)
- `package.json`, `README.md`, `docs/*.md`, `docs/manual/**`
- `playwright-report/results.json`
- `load/results.jtl`, `load/report/index.html`, `load/BASELINE.md`
- `reports/security/*`, `docs/SEGURIDAD.md`
- `reports/evolucion.log`, `reports/informe-final.html`
- `.github/workflows/*.yml`
- `git log --oneline`, `git rev-parse --short HEAD`

# Salida 1 — `informe-entrega.html`
HTML5 autocontenido (`lang="es"`, CSS/JS inline, sin CDN, GitHub-style, `prefers-color-scheme: dark`, responsive, contraste AA, `<nav>` con anclas). Secciones con ancla:

1. **Cabecera**: candidato, contratista Víctor Suárez, repo, commit, fecha.
2. **Resumen ejecutivo**: tarjetas con cifras reales (E2E, API, JMeter error rate, seguridad High, casos manuales, commits). Estado global.
3. **Tiempo invertido**: tabla por bloque (Setup, E2E, API, JMeter, Informe/CI, Seguridad, QA manual) con `Xh Ym`; fila Total; `<pendiente>` si falta.
4. **Cómo ejecutarlo**: bloque con `git clone`, `nvm use`, `npm ci`, `npx playwright install --with-deps`, `cp .env.example .env`, scripts npm.
5. **Validación de cobertura**: tabla Requisito original → Entregado → Evidencia → Estado `✅/⚠️/❌`. Cubre: login OK/KO, carrito, checkout, POM, 2 navegadores, API CRUD, token, status+contenido, JMeter 10 users/60s + aserciones + HTML, GH Actions Playwright, README (setup/decisiones/más tiempo/IA), commits progresivos.
6. **Decisiones técnicas**: tabla `# · Decisión · Motivo · Alternativa descartada · Trade-off` con D1..D15 (POM, selectores, regresión por tags, multi-navegador, fixtures idempotentes, JSON Schema + ajv, baseline JMeter, informe propio, seguridad bonus, QA manual, secrets, gh CLI, commits atómicos, DoD numérico, degradación elegante).
7. **Lo que hicimos y NO estaba pedido**: cada ítem con `<span class="tag bonus">BONUS</span>` (OWASP ZAP+SCA + `docs/SEGURIDAD.md`, QA manual `docs/manual/` 24 casos + 4 plantillas + matriz cruzada + `manual:lint`, evolución verificada, informe unificado con criterios, matriz de trazabilidad, matriz de riesgos P×I, cleanup CI, degradación elegante, uso crítico de IA declarado).
8. **Qué mejoraría con más tiempo**: lista numerada con justificación técnica por ítem (OpenAPI+validator, tests visuales, `@axe-core/playwright`, Allure unificado, casos borde SauceDemo, k6 con thresholds, histórico de flakiness, Pact, WebKit en matriz).
9. **Uso de IA**: Pedí / Acepté / Corregí (≥5 correcciones concretas).
10. **Limitaciones y notas**.
11. **Cierre** con disponibilidad para entrevista y firma.

# Salida 2 — `informe-resultados.html`
HTML5 autocontenido, mismo estilo y `<nav>` con anclas. Secciones:

1. **Cabecera**: fecha/hora, repo, commit HEAD, entorno.
2. **Resumen numérico**: tarjetas E2E passed/failed/skipped, API passed/failed, JMeter error rate y p95, Seguridad High/Medium/Low, Casos manuales, Flaky.
3. **E2E Playwright**: tabla por navegador (`ID · Test · Browser · Tags · Estado · Duración · Error` truncado a 500 chars en `<details>`).
4. **API Booker**: tabla (`ID · Método · Endpoint · Status esperado · Status obtenido · Duración · Resultado`).
5. **Carga JMeter**: tabla (total, fallidas, error rate, p50, p95, max, códigos; enlace a `load/report/index.html`; baseline de `load/BASELINE.md` con umbral ×1.5 y veredicto).
6. **Seguridad OWASP**: tabla (herramienta, target, High/Medium/Low, estado, enlace; supresiones justificadas).
7. **QA manual**: tabla (área, casos, plantillas, matriz, `manual:lint`).
8. **CI**: tabla (workflow, último run, conclusión, artefactos; fuente `gh run list` o `pendiente`).
9. **Flakiness**: tabla (test, 3 corridas, veredicto; fuente `reports/evolucion.log` o `reports/history/`; si no, `NO EJECUTADO`).
10. **Evaluación de criterios de aceptación**: checklist `✅/❌` (smoke 100 %, regresión ≥98 %, carga error <1 %, seguridad 0 High, 0 flaky en 3 corridas, `manual:lint` verde).
11. **Evidencias**: enlaces relativos a `playwright-report/`, `load/report/`, `reports/security/`, `reports/informe-final.html`.
12. **Cómo regenerar este informe**: comandos + `/informe-html`.

# Reglas
1. No inventes cifras → `NO EJECUTADO` + causa en "Limitaciones".
2. Escapa todo texto dinámico (`escapeHtml`).
3. Enlaces relativos desde la raíz del repo.
4. Accesibilidad: `lang="es"`, contraste AA, `<caption>`, `aria-label` en nav.
5. Responsive, dark mode automático.
6. Sin dependencias externas: CSS/JS inline.
7. Incluye en ambos HTML la dirección completa del repo (`https://github.com/Gbrito1985Odoo/qa-automation-test`), el clone con `.git`, commits, archivos, evolución, CI final y enlaces a todas las evidencias; no omitas información verificable.
8. Escribe `informe-entrega.html` e `informe-resultados.html` en la raíz.
9. Al terminar imprime:
```
✅ Informes generados
- informe-entrega.html    (<N> KB · <S> secciones · <T> tablas)
- informe-resultados.html (<N> KB · <S> secciones · <T> tablas)
Cobertura validada: <X>/<Y>
Bonus destacados: <B>
Mejoras justificadas: <M>
Limitaciones: <L>
Veredicto: <PASS|FAIL>
```
