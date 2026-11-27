# SEC-02 — OWASP Dependency-Check

## Metadatos
- **ID**: SEC-02
- **Área**: Seguridad / SCA
- **Prioridad**: Alta
- **Tipo**: Seguridad / Automatizado en CI
- **Automatizado**: Sí (`.github/workflows/security.yml`)
- **Tags**: @security

## Precondiciones
- `npm ci` ejecutado

## Datos de prueba
| Campo | Valor |
|---|---|
| Herramienta | Dependency-Check |
| Umbral | --failOnCVSS 7 |

## Pasos
1. Ejecutar el job `dependency-check`
2. Descargar el HTML
3. Revisar CVEs con CVSS ≥ 7

## Resultado esperado
- Sin CVEs críticos
- Reporte HTML generado

## Evidencia requerida
- `reports/security/dependency-check-report.html`

## Criterio de aceptación
0 hallazgos con CVSS ≥ 7

## Postcondiciones
Artefacto archivado.
