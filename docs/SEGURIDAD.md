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
| OWASP Dependency-Check | release latest de `dependency-check/DependencyCheck` | HTML + `--failOnCVSS 7` |

## Baseline de hallazgos

| Herramienta | High | Medium | Low | Estado |
|---|---:|---:|---:|---|
| ZAP Baseline (SauceDemo) | Pendiente de CI | Pendiente de CI | Pendiente de CI | workflow |
| ZAP API Scan (Booker) | Pendiente de CI | Pendiente de CI | Pendiente de CI | informativo |
| Dependency-Check | Pendiente de CI | Pendiente de CI | Pendiente de CI | workflow |

## Hallazgos y justificación

1. **API2 — Broken Auth:** `POST /auth` con credenciales inválidas devuelve `200` y `{"reason":"Bad credentials"}` (API-02). No expone token; se documenta como comportamiento no estándar con impacto bajo.
2. **API5 — Broken Function Level Auth:** `PUT /booking/{id}` sin token devuelve `403` (API-09); control correcto.
3. **API1 — BOLA:** `GET /booking/{id}` no exige token; el servicio es público de demostración. Limitación del objetivo, no del suite: no se pueden probar permisos por usuario. Cubierto por API-10 (inexistente → 404).
4. **API8 — Misconfiguration:** cabeceras `Content-Type: application/json` presentes; `X-Powered-By: Express` divulgado por Booker. Documentado como Low/Informational.
5. **Web:** SauceDemo no define HSTS, CSP, `X-Content-Type-Options`, `X-Frame-Options`, Permissions Policy ni COEP; además expone comentarios de bundle, Base64 y cabeceras `Sec-Fetch` ausentes. Todas son alertas WARN (High = 0) propias de una SPA demo pública y están suprimidas de forma explícita en `.zap/rules.tsv`.
6. **API:** Booker añade WARN de `X-Powered-By`, HSTS/CSP ausentes, timestamp Unix y contenido HTTP; tampoco hay FAIL-NEW. Se conservan como información, sin supresión ciega salvo reglas ya justificadas.
7. **SCA:** CVEs con CVSS ≥ 7 hacen fallar el job; cualquier excepción debe documentarse aquí con fecha y motivo.

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

# Dependency-Check (CLI local)
curl -sL https://github.com/jeremylong/DependencyCheck/releases/latest/download/dependency-check-latest-release.zip -o dc.zip
unzip -q dc.zip
./dependency-check/bin/dependency-check.sh --project qa-automation-test --scan . --format HTML --out reports/security/dependency-check-report.html --failOnCVSS 7

# Verificación de artefactos descargados de CI
npm run security:check
```

> Docker no está instalado en el equipo donde se generó esta entrega: ZAP se ejecuta exclusivamente en GitHub Actions. Los reportes HTML se descargan como artefactos y se excluyen del repositorio por tamaño.
