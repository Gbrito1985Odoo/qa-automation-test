# API-06 — Actualizar reserva (PUT)

## Metadatos
- **ID**: API-06
- **Área**: API / Booking
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`api/tests/booking-crud.spec.ts::API-06`)
- **Tags**: @regression

## Precondiciones
- Token válido
- Reserva creada

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `PUT /booking/{id}` |
| Cambios | firstname=Updated, totalprice=299 |

## Pasos
1. Enviar PUT con token y booking completo
2. Consultar la reserva

## Resultado esperado
- Status 200
- Datos actualizados persistentes

## Evidencia requerida
- Request/response (`EVIDENCIAS/API-06_put.json`)

## Criterio de aceptación
PUT aplica todos los campos

## Postcondiciones
Reserva eliminada.
