# WEB-10 — Orden por precio

## Metadatos
- **ID**: WEB-10
- **Área**: Web / Inventario
- **Prioridad**: Media
- **Tipo**: Funcional / Positivo
- **Automatizado**: Sí (`e2e/tests/cart.spec.ts::WEB-10`)
- **Tags**: @regression

## Precondiciones
- Inventario visible

## Datos de prueba
| Campo | Valor |
|---|---|
| Orden | Price (low to high) y Price (high to low) |

## Pasos
1. Seleccionar "Price (low to high)"
2. Leer precios
3. Seleccionar "Price (high to low)"
4. Leer precios

## Resultado esperado
- Lista ascendente y luego descendente

## Evidencia requerida
- Capturas de ambos órdenes (`EVIDENCIAS/WEB-10_sort.png`)

## Criterio de aceptación
Precios estrictamente ordenados

## Postcondiciones
Sin cambios persistentes.
