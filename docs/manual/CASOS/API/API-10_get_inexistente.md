# API-10 — GET reserva inexistente

## Metadatos
- **ID**: API-10
- **Área**: API / Booking
- **Prioridad**: Media
- **Tipo**: Funcional / Negativo
- **Automatizado**: Sí (`api/tests/negative.spec.ts::API-10`)
- **Tags**: @regression

## Precondiciones
- ID 999999999 no existe

## Datos de prueba
| Campo | Valor |
|---|---|
| Endpoint | `GET /booking/999999999` |

## Pasos
1. Solicitar el ID inexistente

## Resultado esperado
- Status 404 Not Found

## Evidencia requerida
- Response (`EVIDENCIAS/API-10_404.json`)

## Criterio de aceptación
404 sin divulgación de datos

## Postcondiciones
Ninguna.
