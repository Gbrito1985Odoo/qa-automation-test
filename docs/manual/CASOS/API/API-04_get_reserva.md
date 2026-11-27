# API-04 — Obtener reserva

## Metadatos
- **ID**: API-04
- **Área**: API / Booking
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`api/tests/booking-crud.spec.ts::API-04`)
- **Tags**: @smoke

## Precondiciones
- Reserva creada en el setup

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `GET /booking/{id}` |

## Pasos
1. Crear una reserva
2. Obtenerla por ID

## Resultado esperado
- Status 200
- Cuerpo válido según `booking.schema.json`

## Evidencia requerida
- Response + validación ajv (`EVIDENCIAS/API-04_get.json`)

## Criterio de aceptación
Esquema validado sin errores

## Postcondiciones
Reserva eliminada en el teardown.
