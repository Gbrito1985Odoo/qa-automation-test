# API-05 — Crear reserva

## Metadatos
- **ID**: API-05
- **Área**: API / Booking
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`api/tests/booking-crud.spec.ts::API-05`)
- **Tags**: @smoke @critical

## Precondiciones
- Payload válido de `DATOS/bookings.json`

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `POST /booking` |
| Payload | Booking válido |

## Pasos
1. Enviar POST `/booking` con el payload válido

## Resultado esperado
- Status 200
- Cuerpo con `bookingid` y booking válido según esquema

## Evidencia requerida
- Request/response (`EVIDENCIAS/API-05_create.json`)

## Criterio de aceptación
ID devuelto y esquema validado

## Postcondiciones
Reserva eliminada.
