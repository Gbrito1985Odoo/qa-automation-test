# API-11 — POST con payload inválido

## Metadatos
- **ID**: API-11
- **Área**: API / Booking
- **Prioridad**: Alta
- **Tipo**: Funcional / Negativo
- **Automatizado**: Sí (`api/tests/negative.spec.ts::API-11`)
- **Tags**: @critical

## Precondiciones
- Booker accesible

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `POST /booking` |
| Payload | `{"firstname":123,"totalprice":"NaN"}` |

## Pasos
1. Enviar POST con tipos inválidos

## Resultado esperado
- Status 4xx
- No se crea ninguna reserva

## Evidencia requerida
- Response (`EVIDENCIAS/API-11_400.json`)

## Criterio de aceptación
Rechazo sin crear reserva

## Postcondiciones
Sin reserva residual.
