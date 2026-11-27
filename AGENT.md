# PROMPT MAESTRO — Repo QA Automation + OWASP + Arquitectura de Pruebas Manuales

## Tu rol
Eres un ingeniero QA Automation senior con experiencia en seguridad y en diseño de suites manuales. Debes crear un repositorio público en GitHub, publicarlo, **evolucionarlo por incrementos verificados** (código → ejecutar → evaluar → commit → push), añadir **pruebas de seguridad basadas en OWASP** y construir una **arquitectura de pruebas manuales** completa (casos, plantillas, evidencias, gestión de defectos). No preguntes nada salvo lo indicado en TAREA 0.2. Al terminar, imprime el resumen del Anexo Z.

## Reglas globales
1. **Un commit = una función verificada.** No commitees código que no hayas ejecutado.
2. **Verifica antes de commitear:** tests verdes, JMeter error rate < 1 %, CI verde, security workflow verde, casos manuales documentados con evidencia.
3. TypeScript estricto. Prohibido `any` sin justificación.
4. Selectores E2E: `data-test`, `getByRole`, `getByTestId`. Prohibido XPath y CSS posicional.
5. Secretos en `.env` (nunca en repo). Incluye `.env.example`.
6. Todo texto dinámico en HTML escapado.
7. Si un recurso externo falla, documenta en README + `test.skip` con `TODO`. Nunca relajes aserciones.
8. Node 20 LTS. Stack: Playwright + TS, JMeter 5.6+, GitHub Actions, ESLint, Prettier, ajv, `gh` CLI, OWASP ZAP, OWASP Dependency-Check.
9. **Si el push falla 2 veces, detente y reporta.** Nunca `--force` sobre `main`.
10. **Nunca** crees el repo como `private`.
11. Si el tiempo de 3 h se agota, marca tareas restantes como `SKIP` con justificación, **sin romper el DoD mínimo** (Tareas 0–12 obligatorias; Tarea 13 manual es bonus recomendado; Tarea 14 seguridad también).
12. **Las pruebas manuales deben ser reproducibles por un tercero sin leer el código.** Cada caso manual debe indicar: precondición, datos, pasos, resultado esperado, evidencia requerida y criterio de aceptación.

---

## TAREA 0 — Crear y publicar el repositorio en GitHub

### 0.1 Verificar prerrequisitos
```bash
git --version
gh --version || echo "FALTA gh CLI"
gh auth status || echo "FALTA auth gh"
node --version   # 20.x
jmeter --version || echo "FALTA JMeter"
docker --version || echo "FALTA Docker (ZAP)"
```
Si falta `gh` o auth → detente: `⚠️ Instala GitHub CLI y ejecuta: gh auth login`.
Si falta JMeter → `SKIP` Tarea 6, documenta.
Si falta Docker → `SKIP` ZAP en Tarea 14, usa solo Dependency-Check.

### 0.2 Recoger datos (pregunta una vez, defaults si no responde)
| Variable | Default |
|---|---|
| `REPO_NAME` | `qa-automation-test` |
| `REPO_DESCRIPTION` | `QA Automation — Playwright + API + JMeter + OWASP + Manual QA` |
| `VISIBILITY` | `public` (obligatorio) |
| `GIT_USER_NAME` | `git config user.name` |
| `GIT_USER_EMAIL` | `git config user.email` |

### 0.3 Crear repo remoto
```bash
gh repo create "$REPO_NAME" --public --description "$REPO_DESCRIPTION" --confirm
```
Si existe → pregunta si sobrescribir o renombrar.

### 0.4 Inicializar local + enlazar
```bash
git init && git branch -M main
git remote add origin "https://github.com/$(gh api user -q .login)/$REPO_NAME.git"
git config user.name "$GIT_USER_NAME" && git config user.email "$GIT_USER_EMAIL"
```

### 0.5 Crear `.gitignore` antes del primer commit
Excluye: `node_modules/`, `playwright-report/`, `test-results/`, `load/report/`, `load/results.jtl`, `.env`, `reports/history/`, `reports/security/*.html`, `docs/manual/evidencias/*.png`, `*.log`, `.DS_Store`, `dependency-check-data/`.

> **Nota:** `docs/manual/evidencias/` se excluye porque las capturas pesan; se enlazan desde `docs/manual/evidencias/README.md` con imágenes alojadas en GitHub Issues/Projects o en una carpeta `evidencias/` versionada con LFS si el usuario lo pide.

### 0.6 Commit inicial + push
```bash
git commit --allow-empty -m "chore: initialize repository"
git push -u origin main
```

### 0.7 Secrets
```bash
gh secret set BOOKER_USER --body "admin"
gh secret set BOOKER_PASS --body "password123"
gh secret set BASE_URL_WEB --body "https://www.saucedemo.com"
gh secret set BASE_URL_API --body "https://restful-booker.herokuapp.com"
```

### 0.8 Verificar publicación
```bash
gh repo view --web
```
Confirma: público, rama `main`, secrets OK.

---

## CICLO DE EVOLUCIÓN (aplica a cada tarea 1–14)

Para cada tarea:
1. **Crear** los archivos indicados.
2. **Instalar/compilar** si aplica (`npm ci`, `npx tsc --noEmit`, `npm run lint`).
3. **Ejecutar la función** (comando de verificación de la tarea).
4. **Evaluar**:
   - ✅ → commit + push.
   - ❌ → corrige y repite desde paso 2 (máx. 3 intentos). Si persiste, `wip:` + `test.skip` + `TODO` + nota en `README > Limitaciones`.
5. **Registrar** en `reports/evolucion.log`:
   ```
   [timestamp] TAREA X — comando: <cmd> — resultado: PASS|FAIL — notas: ...
   ```

---

## TAREA 1 — Scaffold del proyecto

### Crear
- `package.json` (scripts: `lint`, `format`, `test:e2e`, `test:smoke`, `test:critical`, `test:regression`, `test:api`, `jmeter:load`, `report:html`, `security:check`, `manual:lint`).
- `tsconfig.json` (strict, ES2022, NodeNext).
- `.nvmrc` → `20`.
- `.env.example`.
- `.eslintrc.cjs`, `.prettierrc`.
- `AGENT.md` (copia de este prompt).

### Verificar
```bash
npm ci && npx tsc --noEmit && npm run lint
```

### Commit
`chore: scaffold project, tsconfig, eslint, playwright config`

---

## TAREA 2 — E2E: Login (WEB-01..04)

### Crear
- `e2e/playwright.config.ts` (chromium+firefox, retries 2 en CI, trace/screenshot/video, reporters html+json).
- `e2e/pages/LoginPage.ts`, `e2e/pages/InventoryPage.ts`.
- `e2e/fixtures/users.ts`.
- `e2e/tests/login.spec.ts` (WEB-01..04).

### Verificar
```bash
npm run test:e2e -- e2e/tests/login.spec.ts   # 8 verdes (4 × 2 navegadores)
```

### Commit + push
`feat(e2e): page objects + login specs (WEB-01..04)`

---

## TAREA 3 — E2E: Carrito y Checkout (WEB-05..10)

### Crear
- `e2e/pages/CartPage.ts`, `e2e/pages/CheckoutPage.ts`.
- `e2e/tests/cart.spec.ts` (WEB-05..07, WEB-10).
- `e2e/tests/checkout.spec.ts` (WEB-08..09).
- `e2e/tests/regression.spec.ts` (login→carrito→checkout `@regression`).

### Verificar
```bash
npm run test:e2e -- e2e/tests/cart.spec.ts e2e/tests/checkout.spec.ts e2e/tests/regression.spec.ts   # 12 verdes
```

### Commit + push
`feat(e2e): cart + checkout specs (WEB-05..10)`

---

## TAREA 4 — API: Auth + CRUD (API-01..08)

### Crear
- `api/clients/BookerClient.ts`.
- `api/tests/auth.spec.ts` (API-01..02).
- `api/tests/booking-crud.spec.ts` (API-03..08) con `beforeEach`/`afterEach`.

### Verificar
```bash
npm run test:api -- api/tests/auth.spec.ts api/tests/booking-crud.spec.ts   # 8 verdes
```

### Commit + push
`feat(api): BookerClient + auth + CRUD specs (API-01..08)`

---

## TAREA 5 — API: Negativos + JSON Schema (API-09..11)

### Crear
- `api/schemas/booking.schema.json`, `api/schemas/auth.schema.json`.
- `api/tests/negative.spec.ts` + validación `ajv` en API-04 y API-05.

### Verificar
```bash
npm run test:api   # 11 verdes
```

### Commit + push
`feat(api): negative cases + JSON schemas (API-09..11)`

---

## TAREA 6 — Carga: JMeter

### Crear
- `load/plan.jmx` (10 threads, ramp 10 s, loop 6, GET `/booking` + POST `/auth`, aserciones 200 y 1500 ms).
- `load/BASELINE.md`.

### Verificar
```bash
jmeter -n -t load/plan.jmx -l load/results.jtl -e -o load/report
# error rate < 1 %, p95 < 1500 ms; rellenar BASELINE.md
```

### Commit + push
`feat(load): JMeter plan + baseline`

---

## TAREA 7 — CI: GitHub Actions

### Crear
- `.github/workflows/playwright.yml` (push+PR, matrix, artefactos, cleanup).
- `.github/workflows/jmeter.yml` (`workflow_dispatch` + schedule semanal).

### Verificar
```bash
git push && gh run watch --exit-status
gh run list --limit 1 --json conclusion -q '.[0].conclusion'   # "success"
```

### Commit + push
`feat(ci): GitHub Actions workflows`

---

## TAREA 8 — Informe HTML + cleanup

### Crear
- `scripts/generate-report.ts` (Playwright + JMeter → `reports/informe-final.html` con tarjetas, tabla por navegador, bloque JMeter, detalle, criterios, evidencias, responsive AA, escape HTML).
- `scripts/cleanup.ts`.
- Script npm `report:html`.

### Verificar
```bash
npm run report:html
test -s reports/informe-final.html && grep -q "pass rate" reports/informe-final.html
```

### Commit + push
`feat(report): HTML report generator + cleanup script`

---

## TAREA 9 — Documentación (README + matrices automatizadas)

### Crear
- `docs/PLAN_PRUEBAS.md` (alcance, regresión por tags, flaky ≥ 2/5, entrada/salida, matriz trazabilidad).
- `docs/MATRIZ_RIESGOS.md` (P 1-5, I 1-5, P×I, mitigación; ≥ 12 → Alta).
- `docs/MATRIZ_TRAZABILIDAD.md` (requisito → test IDs → nivel → estado → evidencia).
- `README.md` con 9 secciones:
  1. Setup · 2. Comandos · 3. Decisiones técnicas · 4. Tiempo real invertido · 5. Uso de IA (**Pedí/Acepté/Corregí**) · 6. Hallazgos (≥ 2 reales) · 7. Qué haría con más tiempo · 8. Tests flaky · 9. Limitaciones.

### Verificar
```bash
for f in README.md docs/PLAN_PRUEBAS.md docs/MATRIZ_RIESGOS.md docs/MATRIZ_TRAZABILIDAD.md; do
  test -s "$f" && echo "OK $f" || echo "FALTA $f"
done
grep -c "^## " README.md   # >= 9
```

### Commit + push
`docs: README, plan de pruebas, matrices`

---

## TAREA 10 — Verificación end-to-end (gate principal)

### Ejecutar
```bash
npm run lint && npx tsc --noEmit
npm run test:smoke && npm run test:regression && npm run test:api
npm run report:html && git push && gh run watch --exit-status
```

### DoD mínimo
```
[ ] Repo público con ≥ 10 commits progresivos
[ ] Playwright pasa en Chromium y Firefox
[ ] POM con 4 page objects
[ ] WEB-01..10 y API-01..11 automatizados
[ ] JSON Schema validado en API-04 y API-05
[ ] JMeter: 10 users / 60 s + BASELINE.md
[ ] GitHub Actions verde
[ ] README 9 secciones + 3 matrices en /docs
[ ] reports/informe-final.html con criterios
[ ] .env.example, sin secretos
[ ] 0 flaky en 3 corridas
[ ] Tiempo real declarado
[ ] reports/evolucion.log con entrada por tarea
```

### Commit + push
`chore: final verification + evolution log`

---

## TAREA 11 — Arquitectura de pruebas manuales (docs/manual/)

### Objetivo
Diseñar una **estructura de pruebas manuales reproducible por un QA humano sin leer código**, alineada 1:1 con los casos automatizados y complementaria a ellos.

### Crear la siguiente estructura

```
docs/manual/
├── README.md                          # Índice y cómo usar esta carpeta
├── ARQUITECTURA.md                    # Diseño: capas, artefactos, flujo
├── PLAN_MANUAL.md                     # Alcance, estrategia, entornos, roles
├── CASOS/
│   ├── WEB/
│   │   ├── WEB-01_login_correcto.md
│   │   ├── WEB-02_login_bloqueado.md
│   │   ├── WEB-03_credenciales_invalidas.md
│   │   ├── WEB-04_campos_vacios.md
│   │   ├── WEB-05_añadir_1_producto.md
│   │   ├── WEB-06_añadir_3_productos.md
│   │   ├── WEB-07_eliminar_producto.md
│   │   ├── WEB-08_checkout_happy.md
│   │   ├── WEB-09_checkout_sin_datos.md
│   │   └── WEB-10_orden_precio.md
│   ├── API/
│   │   ├── API-01_auth_valido.md
│   │   ├── API-02_auth_invalido.md
│   │   ├── API-03_listar_reservas.md
│   │   ├── API-04_get_reserva.md
│   │   ├── API-05_crear_reserva.md
│   │   ├── API-06_put_reserva.md
│   │   ├── API-07_patch_reserva.md
│   │   ├── API-08_delete_reserva.md
│   │   ├── API-09_put_sin_token.md
│   │   ├── API-10_get_inexistente.md
│   │   └── API-11_post_invalido.md
│   ├── CARGA/
│   │   └── JM-01_carga_10_users.md
│   └── SEGURIDAD/
│       ├── SEC-01_zap_baseline.md
│       ├── SEC-02_dependency_check.md
│       └── SEC-03_owasp_api_top10.md
├── PLANTILLAS/
│   ├── caso_prueba.md                 # Plantilla de caso
│   ├── bug_report.md                  # Plantilla de defecto
│   ├── evidencia.md                   # Plantilla de evidencia
│   └── sesion_exploratoria.md         # Plantilla de session-based testing
├── DATOS/
│   ├── users.json                     # Datos de SauceDemo
│   ├── bookings.json                  # Payloads Booker
│   └── envs.md                        # URLs y credenciales por entorno
├── EVIDENCIAS/
│   └── README.md                      # Convención de nombres y almacenamiento
└── RESULTADOS/
    ├── ejecucion_YYYY-MM-DD.md        # Registro de corridas manuales
    └── metricas.md                    # KPIs: pass rate, defectos, tiempo
```

### Contenido obligatorio por archivo

#### `docs/manual/README.md`
- Índice navegable (tabla de contenidos con enlaces relativos).
- Cómo ejecutar un caso manual paso a paso.
- Convención de nombres: `ID_titulo_corto.md`.
- Enlace a `PLANTILLAS/` y `EVIDENCIAS/`.

#### `docs/manual/ARQUITECTURA.md`
Debe explicar:
1. **Capas**: `CASOS` (qué probar) → `DATOS` (con qué) → `PLANTILLAS` (cómo documentar) → `EVIDENCIAS` (prueba de ejecución) → `RESULTADOS` (métricas).
2. **Flujo de ejecución**:
   ```
   Leer caso → Preparar datos → Ejecutar pasos → Capturar evidencia → 
   Registrar resultado en RESULTADOS/ → Si falla: abrir bug con PLANTILLAS/bug_report.md
   ```
3. **Trazabilidad**: cada caso manual enlaza a su test automatizado (si existe) y viceversa.
4. **Roles**: QA manual, QA automation, líder de QA (RACI).
5. **Herramientas compatibles**: TestRail, Xray, Zephyr, o GitHub Projects (etiquetas `type:manual`, `status:passed/failed`).
6. **Criterio de "manual vs automatizado"**: lo repetitivo y estable → automático; lo exploratorio, visual o de una sola vez → manual.

#### `docs/manual/PLAN_MANUAL.md`
- Alcance y fuera de alcance.
- Entornos: `local`, `CI`, `prod-like`.
- Estrategia: smoke manual antes de release, regresión manual semanal, exploratorio por release.
- Criterios de entrada/salida.
- Roles y responsabilidades.
- Gestión de defectos (severidad, prioridad, SLA).
- KPIs: pass rate manual, defectos encontrados, tiempo medio por caso.

#### Cada caso `docs/manual/CASOS/<ÁREA>/<ID>_<titulo>.md`
Usar la plantilla `PLANTILLAS/caso_prueba.md`. Debe contener:
```markdown
# WEB-01 — Login correcto

## Metadatos
- **ID**: WEB-01
- **Área**: Web / Autenticación
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`e2e/tests/login.spec.ts::WEB-01`)
- **Tags**: `@smoke @critical`

## Precondiciones
- Navegador abierto en `https://www.saucedemo.com`
- Usuario `standard_user` disponible

## Datos de prueba
| Campo | Valor |
|---|---|
| Usuario | `standard_user` |
| Contraseña | `secret_sauce` |

## Pasos
1. Abrir `https://www.saucedemo.com`
2. Ingresar usuario `standard_user`
3. Ingresar contraseña `secret_sauce`
4. Click en "Login"

## Resultado esperado
- Redirección a `/inventory.html`
- Título de página: "Products"
- Menú lateral visible

## Evidencia requerida
- Captura de pantalla del inventario (`EVIDENCIAS/WEB-01_inventory.png`)
- Log de consola sin errores

## Criterio de aceptación
✅ Redirección correcta + título "Products" visible

## Postcondiciones
- Sesión iniciada; cerrar sesión al finalizar.
```

#### `docs/manual/PLANTILLAS/caso_prueba.md`
Plantilla vacía con todos los campos de arriba.

#### `docs/manual/PLANTILLAS/bug_report.md`
```markdown
# BUG-<ID> — <Título corto>

## Metadatos
- **ID**: BUG-XXX
- **Caso origen**: WEB-XX
- **Severidad**: Blocker | Critical | Major | Minor
- **Prioridad**: Alta | Media | Baja
- **Entorno**: <URL, navegador, SO>
- **Fecha**: YYYY-MM-DD
- **Reportado por**: <nombre>

## Descripción
<Qué ocurre vs qué se esperaba>

## Pasos para reproducir
1. ...
2. ...

## Resultado esperado
...

## Resultado actual
...

## Evidencia
- Captura: `EVIDENCIAS/BUG-XXX_*.png`
- Video: `EVIDENCIAS/BUG-XXX_*.webm`
- Trace Playwright: `test-results/.../trace.zip` (si aplica)

## Impacto
...

## Workaround
...
```

#### `docs/manual/PLANTILLAS/sesion_exploratoria.md`
Charter, timebox (60–90 min), áreas exploradas, hallazgos, bugs abiertos.

#### `docs/manual/DATOS/users.json`
```json
{
  "standard": { "username": "standard_user", "password": "secret_sauce" },
  "locked":   { "username": "locked_out_user", "password": "secret_sauce" },
  "invalid":  { "username": "wrong_user", "password": "wrong_pass" }
}
```

#### `docs/manual/DATOS/bookings.json`
Payloads válidos e inválidos para Booker (create, update, patch, invalid).

#### `docs/manual/DATOS/envs.md`
| Entorno | Web | API | Credenciales |
|---|---|---|---|
| Local | `https://www.saucedemo.com` | `https://restful-booker.herokuapp.com` | `admin`/`password123` |
| CI | idem | idem | desde secrets |

#### `docs/manual/EVIDENCIAS/README.md`
Convención: `<ID>_<paso>_<timestamp>.png`. Almacenamiento: GitHub Issues adjuntos o carpeta `evidencias/` con Git LFS. Tamaño máximo 2 MB por archivo.

#### `docs/manual/RESULTADOS/ejecucion_YYYY-MM-DD.md`
Tabla de corrida:
```markdown
# Ejecución manual — YYYY-MM-DD

| ID | Resultado | Evidencia | Bug | Notas |
|---|---|---|---|---|
| WEB-01 | PASS | EVIDENCIAS/WEB-01_*.png | — | — |
| WEB-02 | FAIL | EVIDENCIAS/WEB-02_*.png | BUG-001 | Mensaje distinto |
```

#### `docs/manual/RESULTADOS/metricas.md`
KPIs: pass rate, defectos por severidad, tiempo medio por caso, cobertura manual vs automatizada.

### Script de soporte
Crear `scripts/manual-lint.ts` que valide:
- Cada caso tiene las secciones obligatorias (`Metadatos`, `Precondiciones`, `Pasos`, `Resultado esperado`, `Evidencia requerida`, `Criterio de aceptación`).
- El `ID` del archivo coincide con el `ID` del metadato.
- Cada caso automatizado (WEB-01..10, API-01..11) tiene su caso manual correspondiente.
Añadir a `package.json`: `"manual:lint": "ts-node scripts/manual-lint.ts"`.

### Verificar
```bash
npm run manual:lint
# Debe imprimir "OK: 24 casos manuales validados, 0 huérfanos"

for d in CASOS PLANTILLAS DATOS EVIDENCIAS RESULTADOS; do
  test -d "docs/manual/$d" && echo "OK $d" || echo "FALTA $d"
done

test -s docs/manual/ARQUITECTURA.md && echo "OK arquitectura"
test -s docs/manual/PLAN_MANUAL.md && echo "OK plan manual"
ls docs/manual/CASOS/WEB/*.md | wc -l   # 10
ls docs/manual/CASOS/API/*.md | wc -l   # 11
ls docs/manual/CASOS/CARGA/*.md | wc -l # 1
ls docs/manual/CASOS/SEGURIDAD/*.md | wc -l  # 3
```

### Commit + push
`docs(manual): arquitectura de pruebas manuales + casos + plantillas`

---

## TAREA 12 — Integración manual ↔ automatizado

### Crear
- `docs/manual/MATRIZ_MANUAL_AUTO.md`: tabla cruzada.

| ID | Caso manual | Test automatizado | Estado manual | Estado auto | Última ejecución |
|---|---|---|---|---|---|
| WEB-01 | `CASOS/WEB/WEB-01_*.md` | `e2e/tests/login.spec.ts::WEB-01` | ✅ | ✅ | 2025-XX-XX |
| ... | ... | ... | ... | ... | ... |

- Añadir en cada spec de Playwright un comentario de cabecera:
  ```ts
  // Caso manual: docs/manual/CASOS/WEB/WEB-01_login_correcto.md
  test('WEB-01 login correcto @smoke @critical', ...)
  ```

### Verificar
```bash
grep -r "Caso manual:" e2e/tests api/tests | wc -l   # >= 21 (10 WEB + 11 API)
test -s docs/manual/MATRIZ_MANUAL_AUTO.md && echo "OK matriz cruzada"
```

### Commit + push
`docs(manual): matriz de trazabilidad manual ↔ automatizado`

---

## TAREA 13 — Verificación end-to-end final (gate completo)

### Ejecutar
```bash
npm run lint && npx tsc --noEmit
npm run test:smoke && npm run test:regression && npm run test:api
npm run report:html
npm run manual:lint
git push && gh run watch --exit-status
gh run list --workflow=security.yml --limit 1 --json conclusion -q '.[0].conclusion'
```

### DoD completo
```
Automatización:
[ ] Repo público con ≥ 12 commits progresivos
[ ] Playwright pasa en Chromium y Firefox
[ ] POM con 4 page objects
[ ] WEB-01..10 y API-01..11 automatizados
[ ] JSON Schema validado en API-04 y API-05
[ ] JMeter: 10 users / 60 s + BASELINE.md
[ ] GitHub Actions verde
[ ] Informe HTML con criterios evaluados
[ ] 0 flaky en 3 corridas
[ ] reports/evolucion.log completo

Manual:
[ ] docs/manual/ARQUITECTURA.md + PLAN_MANUAL.md
[ ] 24 casos manuales (10 WEB + 11 API + 1 CARGA + 3 SEGURIDAD)
[ ] 4 plantillas (caso, bug, evidencia, exploratoria)
[ ] DATOS/users.json + bookings.json + envs.md
[ ] EVIDENCIAS/README.md con convención
[ ] RESULTADOS/ con plantilla de ejecución y métricas
[ ] MATRIZ_MANUAL_AUTO.md con 21 filas cruzadas
[ ] `manual:lint` verde
[ ] Cada spec automatizado referencia su caso manual

Seguridad:
[ ] Security workflow verde (ZAP + Dependency-Check)
[ ] reports/security/ con ambos reportes HTML
[ ] docs/SEGURIDAD.md completo
```

Si alguna casilla falla → **no cierres**: corrige, commitea, repite.

### Commit + push
`chore: final verification (auto + manual + security)`

---

## TAREA 14 — Pruebas de seguridad OWASP (DAST + SCA)

### Objetivo
Alinear con **OWASP Top 10** (web) y **OWASP API Security Top 10** usando **ZAP** (DAST) y **Dependency-Check** (SCA). Los casos manuales de seguridad ya existen en Tarea 11 (`CASOS/SEGURIDAD/`); aquí se implementa la parte automatizada.

### Crear
- `.github/workflows/security.yml`
- `.zap/rules.tsv` (supresiones justificadas)
- `docs/SEGURIDAD.md`
- (generados por CI) `reports/security/zap-report.html`, `reports/security/dependency-check-report.html`

### 14.1 DAST — ZAP Baseline (SauceDemo)
Detecta: cabeceras ausentes (CSP, HSTS, X-Content-Type-Options, X-Frame-Options), cookies sin `Secure`/`HttpOnly`, divulgación de info, CORS permisivo, CSRF.

```yaml
  zap-baseline:
    name: ZAP Baseline Scan (SauceDemo)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: zaproxy/action-baseline@v0.15.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          target: 'https://www.saucedemo.com'
          rules_file_name: '.zap/rules.tsv'
          cmd_options: '-a -j'
          allow_issue_writing: false
          fail_action: true
          artifact_name: 'zap-baseline-report'
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: zap-baseline-report
          path: report_html.html
          retention-days: 30
```

`.zap/rules.tsv`:
```tsv
# Rule ID	Action	Description
10015	IGNORE	Incomplete Cache-control Header (SauceDemo público)
10011	IGNORE	Cookie Without Secure Flag (SauceDemo demo)
```

Criterio: `fail_action: true` → falla con alerta **High**. Medium/Baja se documentan.

### 14.2 DAST — ZAP API Scan / manual (Booker)
| OWASP API | Prueba |
|---|---|
| API1 — BOLA | `GET /booking/{id}` sin auth por usuario → documentar limitación |
| API2 — Broken Auth | `POST /auth` inválido → 200 "Bad credentials"; expiración de token |
| API5 — Broken Function Level Auth | `DELETE /booking/{id}` sin token → **403** (API-09) |
| API8 — Misconfiguration | Cabeceras `Content-Type`, `X-Powered-By` |

```yaml
  zap-api-scan:
    name: ZAP API Scan (Booker)
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: zaproxy/action-api-scan@v0.9.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          format: openapi
          target: 'https://restful-booker.herokuapp.com/apidoc'
          rules_file_name: '.zap/rules-api.tsv'
          fail_action: true
```

> Si Booker no expone OpenAPI, se sustituye por API-09 y API-10 y se documenta en `docs/SEGURIDAD.md`.

### 14.3 SCA — Dependency-Check
```yaml
  dependency-check:
    name: OWASP Dependency-Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: |
          VERSION=$(curl -s https://jeremylong.github.io/DependencyCheck/current.txt)
          curl -sL "https://github.com/jeremylong/DependencyCheck/releases/download/v$VERSION/dependency-check-$VERSION-release.zip" -o dc.zip
          unzip -q dc.zip
      - run: |
          ./dependency-check/bin/dependency-check.sh \
            --project "qa-automation-test" \
            --scan . \
            --format HTML \
            --out reports/security/dependency-check-report.html \
            --failOnCVSS 7
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: dependency-check-report
          path: reports/security/dependency-check-report.html
          retention-days: 30
```

### 14.4 `docs/SEGURIDAD.md`
Alcance, fuera de alcance, herramientas/versiones, tabla baseline (High/Medium/Low), hallazgos con justificación, supresiones, comandos locales (Docker para ZAP, CLI para Dependency-Check).

### Verificar
```bash
git push && gh run watch --exit-status
gh run list --workflow=security.yml --limit 1 --json conclusion -q '.[0].conclusion'
gh run download --name zap-baseline-report
gh run download --name dependency-check-report
test -s zap-baseline-report/report_html.html && echo "OK ZAP"
test -s dependency-check-report/dependency-check-report.html && echo "OK SCA"
```

### Commit + push
`feat(security): OWASP ZAP baseline + Dependency-Check SCA`

---

## ANEXO Z — Salida final esperada del agente

```
✅ Repositorio generado, publicado, evolucionado, asegurado y con QA manual
- Repo: https://github.com/<owner>/<repo>
- Visibilidad: public
- Commits: <N> (init + Tareas 1–14 + final)
- Archivos creados: <N>
- Secrets: BOOKER_USER, BOOKER_PASS, BASE_URL_WEB, BASE_URL_API
- Evolución: reports/evolucion.log (<N> entradas, <M> PASS, <K> FAIL corregidos)

Automatización:
- E2E: 10 × 2 navegadores = 20 ejecuciones
- API: 11 tests
- JMeter: 10 users / 60 s, error rate <X>%, p95 <Y>ms
- CI: playwright.yml + jmeter.yml (último run: success)
- Informe: reports/informe-final.html

Manual:
- Casos: 24 (10 WEB + 11 API + 1 CARGA + 3 SEGURIDAD)
- Plantillas: 4
- Datos: users.json + bookings.json + envs.md
- Matriz manual↔auto: MATRIZ_MANUAL_AUTO.md (21 filas)
- manual:lint: OK

Seguridad:
- security.yml (ZAP: <H>/<M>/<L>; SCA: <H>/<M>/<L>)
- docs/SEGURIDAD.md completo
- reports/security/ con ambos HTML

Docs:
- README 9 secciones
- PLAN_PRUEBAS.md, MATRIZ_RIESGOS.md, MATRIZ_TRAZABILIDAD.md, SEGURIDAD.md
- docs/manual/ARQUITECTURA.md + PLAN_MANUAL.md

Pendiente de revisión humana: <lista de TODOs>
```

## ANEXO W — Estructura final

```
qa-automation/
├── .github/workflows/{playwright.yml, jmeter.yml, security.yml}
├── .zap/rules.tsv
├── .env.example
├── .nvmrc
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── AGENT.md
├── docs/
│   ├── PLAN_PRUEBAS.md
│   ├── MATRIZ_RIESGOS.md
│   ├── MATRIZ_TRAZABILIDAD.md
│   ├── SEGURIDAD.md
│   └── manual/
│       ├── README.md
│       ├── ARQUITECTURA.md
│       ├── PLAN_MANUAL.md
│       ├── MATRIZ_MANUAL_AUTO.md
│       ├── CASOS/
│       │   ├── WEB/     (10 archivos)
│       │   ├── API/     (11 archivos)
│       │   ├── CARGA/   (1 archivo)
│       │   └── SEGURIDAD/ (3 archivos)
│       ├── PLANTILLAS/  (4 archivos)
│       ├── DATOS/       (3 archivos)
│       ├── EVIDENCIAS/  (README)
│       └── RESULTADOS/  (ejecución + métricas)
├── e2e/
│   ├── pages/{LoginPage, InventoryPage, CartPage, CheckoutPage}.ts
│   ├── tests/{login, cart, checkout, regression}.spec.ts
│   ├── fixtures/users.ts
│   └── playwright.config.ts
├── api/
│   ├── clients/BookerClient.ts
│   ├── schemas/{booking, auth}.schema.json
│   └── tests/{auth, booking-crud, negative}.spec.ts
├── load/{plan.jmx, BASELINE.md}
├── reports/
│   ├── informe-final.html
│   ├── evolucion.log
│   └── security/{zap-report.html, dependency-check-report.html}
├── scripts/{generate-report.ts, cleanup.ts, manual-lint.ts}
├── package.json
├── tsconfig.json
└── README.md
```

## Cierre
Ejecuta todo sin preguntar (solo TAREA 0.2 una vez). **No commitees sin verificar**. Si una verificación falla, corrige antes de avanzar. Si el tiempo se agota, marca tareas restantes `SKIP` con justificación en README, respetando el DoD mínimo (Tareas 0–13). Al terminar, imprime el Anexo Z y detente.