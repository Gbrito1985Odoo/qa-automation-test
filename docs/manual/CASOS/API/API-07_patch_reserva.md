# API-07 — Actualizar reserva (PATCH)

## Metadatos
- **ID**: API-07
- **Área**: API / Booking
- **Prioridad**: Media
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`api/tests/booking-crud.spec.ts::API-07`)
- **Tags**: @regression

## Precondiciones
- Token válido
- Reserva creada

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `PATCH /booking/{id}` |
| Cambio | firstname=Patched |

## Pasos
1. Enviar PATCH con un solo campo
2. Consultar la reserva

## Resultado esperado
- Status 200
- Solo `firstname` modificado

## Evidencia requerida
- Request/response (`EVIDENCIAS/API-07_patch.json`)

## Criterio de aceptación
Actualización parcial correcta

## Postcondiciones
Reserva eliminada.
