# API-08 — Eliminar reserva

## Metadatos
- **ID**: API-08
- **Área**: API / Booking
- **Prioridad**: Alta
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`api/tests/booking-crud.spec.ts::API-08`)
- **Tags**: @regression

## Precondiciones
- Token válido
- Reserva creada

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `DELETE /booking/{id}` |

## Pasos
1. Enviar DELETE con token
2. Consultar el ID eliminado

## Resultado esperado
- Status 201 en DELETE
- Status 404 en GET posterior

## Evidencia requerida
- Request/response (`EVIDENCIAS/API-08_delete.json`)

## Criterio de aceptación
Reserva no disponible tras borrado

## Postcondiciones
Sin reserva residual.
