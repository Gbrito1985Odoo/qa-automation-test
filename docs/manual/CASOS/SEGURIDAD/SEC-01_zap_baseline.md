# SEC-01 — OWASP ZAP Baseline

## Metadatos
- **ID**: SEC-01
- **Área**: Seguridad / DAST
- **Prioridad**: Alta
- **Tipo**: Seguridad / Automatizado en CI
- **Automatizado**: Sí (`.github/workflows/security.yml`)
- **Tags**: @security

## Precondiciones
- Workflow de seguridad disponible
- Objetivo: https://www.saucedemo.com

## Datos de prueba
| Campo | Valor |
|---|---|
| Herramienta | zaproxy/action-baseline |
| Reglas | `.zap/rules.tsv` |

## Pasos
1. Ejecutar el job `zap-baseline`
2. Descargar el artefacto HTML
3. Revisar alertas High/Medium

## Resultado esperado
- Sin alertas High
- Medium documentadas

## Evidencia requerida
- `reports/security/zap-report.html`
- `docs/SEGURIDAD.md`

## Criterio de aceptación
0 High y supresiones justificadas

## Postcondiciones
Artefacto archivado 30 días.
