# API-09 — PUT sin token

## Metadatos
- **ID**: API-09
- **Área**: API / Seguridad
- **Prioridad**: Alta
- **Tipo**: Seguridad / Negativo
- **Automatizado**: Sí (`api/tests/negative.spec.ts::API-09`)
- **Tags**: @critical @security

## Precondiciones
- Reserva creada
- Sin cookie de token

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `PUT /booking/{id}` |
| Token | (ausente) |

## Pasos
1. Enviar PUT sin cabecera Cookie

## Resultado esperado
- Status 403 Forbidden

## Evidencia requerida
- Response (`EVIDENCIAS/API-09_403.json`)

## Criterio de aceptación
Acceso denegado sin token

## Postcondiciones
Reserva eliminada con token en limpieza.
