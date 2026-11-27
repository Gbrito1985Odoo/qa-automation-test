# API-03 — Listar reservas

## Metadatos
- **ID**: API-03
- **Área**: API / Booking
- **Prioridad**: Media
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`api/tests/booking-crud.spec.ts::API-03`)
- **Tags**: @smoke

## Precondiciones
- Booker accesible
- Existe al menos una reserva

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `GET /booking` |

## Pasos
1. Enviar GET `/booking`

## Resultado esperado
- Status 200
- Array no vacío de objetos con `bookingid` numérico

## Evidencia requerida
- Response guardada (`EVIDENCIAS/API-03_list.json`)

## Criterio de aceptación
Lista devuelta con IDs válidos

## Postcondiciones
Ninguna.
