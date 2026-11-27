# SEC-03 — OWASP API Security Top 10

## Metadatos
- **ID**: SEC-03
- **Área**: Seguridad / API
- **Prioridad**: Media
- **Tipo**: Seguridad / Manual + API
- **Automatizado**: Parcial (API-09, API-10)
- **Tags**: @security @manual

## Precondiciones
- Booker accesible
- Token válido

## Datos de prueba
| Campo | Valor |
|---|---|
| Controles | API1, API2, API5, API8 |

## Pasos
1. Probar BOLA con identificadores de otros usuarios
2. Probar auth inválida
3. Probar función sin token
4. Revisar cabeceras

## Resultado esperado
- Hallazgos documentados con impacto y mitigación

## Evidencia requerida
- `docs/SEGURIDAD.md`
- Casos API-02/09/10

## Criterio de aceptación
Hallazgos clasificados y aceptados

## Postcondiciones
Sin modificación del servicio externo.
