# Seguridad OWASP

## Alcance

- **DAST web:** SauceDemo (`https://www.saucedemo.com`) con ZAP Baseline.
- **DAST API:** Restful Booker (`https://restful-booker.herokuapp.com/apidoc`) con ZAP API Scan (modo informativo).
- **SCA:** dependencias npm con OWASP Dependency-Check (`--failOnCVSS 7`).
- **API manual:** OWASP API Security Top 10 (API1 BOLA, API2 Broken Auth, API5 BFLA, API8 Misconfiguration).

Fuera de alcance: explotación activa, pruebas sobre servicios de producción y modificación de terceros.

## Herramientas y versiones

| Herramienta | Versión / acción | Uso |
|---|---|---|
| OWASP ZAP Baseline | `zaproxy/action-baseline@v0.15.0` | `-a -j`, `fail_action: true`, reglas `.zap/rules.tsv` |
| OWASP ZAP API Scan | `zaproxy/action-api-scan@v0.9.0` | formato `openapi`, informativo (`continue-on-error`) |
| SCA npm audit | npm CLI | Gate obligatorio: 0 High/Critical |
| OWASP Dependency-Check | `v12.1.0` (opcional, `ENABLE_DEPENDENCY_CHECK=true`) | HTML + `--failOnCVSS 7`; SKIP por NVD sin API key |

## Baseline de hallazgos

| Herramienta | High | Medium | Low | Estado |
|---|---:|---:|---:|---|
| ZAP Baseline (SauceDemo) | 0 | 4 | 5 (11 info) | ✅ CI run `45992092380` |
| ZAP API Scan (Booker) | 0 | 2 | 86 (6 info) | ✅ informativo, CI run `45992092380` |
| SCA npm audit | 0 | 6 moderate | 0 | ✅ gate local y CI |
| Dependency-Check | — | — | — | SKIP justificado: NVD sin `NVD_API_KEY` excede el tiempo de CI |

Los conteos proceden de `report_json.json` descargado de los artefactos de CI; las alertas INFO no cuentan como WARN. Ningún reporte contiene FAIL-NEW.

## Hallazgos y justificación

1. **API2 — Broken Auth:** `POST /auth` con credenciales inválidas devuelve `200` y `{"reason":"Bad credentials"}` (API-02). No expone token; se documenta como comportamiento no estándar con impacto bajo.
2. **API5 — Broken Function Level Auth:** `PUT /booking/{id}` sin token devuelve `403` (API-09); control correcto.
3. **API1 — BOLA:** `GET /booking/{id}` no exige token; el servicio es público de demostración. Limitación del objetivo, no del suite: no se pueden probar permisos por usuario. Cubierto por API-10 (inexistente → 404).
4. **API8 — Misconfiguration:** cabeceras `Content-Type: application/json` presentes; `X-Powered-By: Express` divulgado por Booker. Documentado como Low/Informational.
5. **Web:** SauceDemo no define HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`, Permissions Policy ni COEP; además expone comentarios de bundle, Base64 y cabeceras `Sec-Fetch` ausentes. Todas son alertas WARN (High = 0) propias de una SPA demo pública y están suprimidas de forma explícita en `.zap/rules.tsv`.
6. **API:** Booker añade WARN de `X-Powered-By`, HSTS/CSP ausentes, timestamp Unix y contenido HTTP; tampoco hay FAIL-NEW. Se conservan como información, sin supresión ciega salvo reglas ya justificadas.
7. **SCA:** `npm audit` reporta 0 High y 0 Critical (6 Moderate) y es el gate obligatorio. Dependency-Check v13 falló sin `NVD_API_KEY` y v12.1.0 no completó la carga inicial de NVD en el tiempo de CI; queda como job opcional y su SKIP se documenta aquí. Cualquier excepción futura debe registrar fecha y motivo.

## Supresiones

| Regla | Motivo |
|---|---|
| 10015 | Contenido público de demostración, sin datos sensibles en caché |
| 10011 | Cookie de sesión del sitio demo |
| 10016 / 10021 / 10020 | Cabeceras obsoletas o mitigadas por el navegador; documentadas |
| 10202 | API sin formularios; autenticación por token en cabecera/cookie |

## Comandos locales

```bash
# ZAP (requiere Docker; no disponible en el entorno local de esta entrega)
docker run --rm -v "$(pwd):/zap/wrk/:rw" -t zaproxy/zap-stable \
  zap-baseline.py -t https://www.saucedemo.com -r .zap/rules.tsv -j -a

# SCA obligatorio (genera reports/security/sca-report.html)
npm audit --json > reports/security/npm-audit.json || true
npx ts-node scripts/generate-sca-report.ts

# Dependency-Check opcional (requiere NVD_API_KEY o ENABLE_DEPENDENCY_CHECK=true en CI)
curl -sL https://github.com/dependency-check/DependencyCheck/releases/download/v12.1.0/dependency-check-12.1.0-release.zip -o dc.zip
unzip -q dc.zip
./dependency-check/bin/dependency-check.sh --project qa-automation-test --scan . --format HTML --out reports/security/dependency-check-report.html --failOnCVSS 7

# Verificación de artefactos descargados de CI
npm run security:check
```

> Docker no está instalado en el equipo donde se generó esta entrega: ZAP se ejecuta exclusivamente en GitHub Actions. Los reportes HTML se descargan como artefactos y se excluyen del repositorio por tamaño. Dependency-Check se reporta como SKIP justificado; el gate SCA se cumple con `npm audit` (0 High/Critical).
