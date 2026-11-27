# Plan manual de pruebas

## Alcance

- Web: login (correcto, bloqueado, inválido, vacío), carrito, checkout y orden por precio.
- API: auth, CRUD, negativos y controles OWASP API.
- Carga: perfil de 10 usuarios y verificación del baseline.
- Seguridad: DAST (ZAP), SCA (Dependency-Check) y revisión manual OWASP API Top 10.

Fuera de alcance: datos reales de producción, pruebas de usabilidad con usuarios reales y WebKit.

## Entornos

| Entorno | Web | API | Uso |
|---|---|---|---|
| local | `https://www.saucedemo.com` | `https://restful-booker.herokuapp.com` | Ejecución interactiva |
| CI | idem | idem | Secrets de GitHub Actions |
| prod-like | pendiente de entorno dedicado | pendiente | No disponible actualmente |

## Estrategia

- **Smoke manual** antes de cada release: WEB-01, WEB-05, WEB-08 y API-01.
- **Regresión manual** semanal: los 21 casos WEB/API.
- **Exploratorio** por release: 60–90 min con la plantilla de sesión, centrado en cambios visuales y mensajes de error.

## Criterios de entrada y salida

Entrada: build desplegado, servicios accesibles, datos de `DATOS/` listos y entorno identificado.
Salida: 100 % de casos críticos PASS, 0 defectos Blocker/Critical abiertos y evidencia enlazada.

## Roles y responsabilidades

- QA manual: ejecuta, documenta y abre defectos.
- QA automation: mantiene el equivalente automatizado y la matriz cruzada.
- Líder de QA: aprueba la salida y prioriza defectos.

## Gestión de defectos

| Severidad | Definición | Prioridad | SLA |
|---|---|---|---|
| Blocker | Impide continuar | Alta | 4 h |
| Critical | Función crítica rota | Alta | 1 día |
| Major | Funcionalidad degradada | Media | 3 días |
| Minor | Cosmético o incidencia menor | Baja | 1 sprint |

Se usa `PLANTILLAS/bug_report.md`; todo bug debe enlazar caso origen y evidencia.

## KPIs

- Pass rate manual: PASS / casos ejecutados.
- Defectos encontrados por severidad.
- Tiempo medio por caso (objetivo ≤ 5 min).
- Cobertura manual vs automatizada (objetivo 21/21).
